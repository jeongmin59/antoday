from collections import defaultdict
import re
from typing import Optional, Pattern, Match
from bs4 import BeautifulSoup
from numpy import sort
import requests
from app.models.models import (
    Keyword,
    News,
    NewsKeyword,
    NewsStock,
    Stock,
    Stopword,
    Textmining,
)
from app.schemas.keyword import KeywordDTO
from sqlalchemy.orm import Session
from konlpy.tag import Okt


def create_stopword(db: Session, word: str) -> dict:
    db_stopword: Stopword = Stopword(word=word)
    existing_keyword: Optional[Stopword] = (
        db.query(Stopword).filter_by(word=word).first()
    )
    if not existing_keyword:
        db_stopword = Stopword(word=word)
        db.add(db_stopword)
        db.commit()
        return {"status": "success"}
    else:
        return {"status": "already exist"}


def get_keywords(db: Session) -> list[KeywordDTO]:
    textminings: list[Textmining] = (
        db.query(Textmining).order_by(Textmining.textmining_pk.desc()).limit(3).all()
    )
    word_cloud = []
    word_dict: defaultdict = defaultdict(float)
    text_mining_weight = 1
    for textmining in textminings:
        textmining_pk: int = textmining.textmining_pk
        all_news: list[News] = (
            db.query(News).filter_by(textmining_pk=textmining_pk).all()
        )

        for news in all_news:
            news_pk = news.news_pk
            news_word_dict: defaultdict = defaultdict(float)
            keywords: list[Keyword] = (
                db.query(NewsKeyword)
                .filter_by(news_pk=news_pk)
                .join(Keyword, NewsKeyword.word == Keyword.keyword)
                .all()
            )
            for keyword in keywords:
                kwd = keyword.keyword.keyword
                news_word_dict[kwd] += 1 if kwd in news_word_dict else 0.2
            for word, weight in news_word_dict.items():
                word_dict[word] += weight * text_mining_weight
        text_mining_weight -= 0.2
    cnt = 0
    for word, weight in sorted(word_dict.items(), key=lambda x: -x[1]):
        word_cloud.append(KeywordDTO(text=word, value=weight))
        cnt += 1
        if cnt > 50:
            break
    return word_cloud


def create_textmining(db: Session) -> None:
    try:
        db_textmining: Textmining = Textmining()
        db.add(db_textmining)
        db.commit()
        textmining_pk = (
            db.query(Textmining)
            .order_by(Textmining.textmining_pk.desc())
            .first()
            .textmining_pk
        )
        # 가장 최근 뉴스의 url을 가져옴
        temp_news: str = db.query(News).order_by(News.news_pk).first()
        if temp_news:
            pre_article_url: str = (
                db.query(News).order_by(News.news_pk.desc()).first().url
            )
        else:
            pre_article_url = "dd"
        articles: list[dict] = crawl(pre_article_url)  # 해당 뉴스 전까지의 모든 뉴스 크롤링
        articles.reverse()
        for article in articles:
            create_news(db, article, textmining_pk)  # 뉴스별로 텍스트 추출
    except Exception as e:
        print("에러 :", str(e))
        db.rollback()


def create_news(db: Session, article: dict, textmining_pk: str) -> None:  # 뉴스 하나 만드는 함수
    print(article)
    url: str = article["url"]
    db_news: News = News(url=url, textmining_pk=textmining_pk)
    db.add(db_news)
    db.commit()
    news_pk: int = db.query(News).order_by(News.news_pk.desc()).first().news_pk
    okt: Okt = Okt()
    poss: list[tuple[str, str]] = okt.pos(
        article["content"] + article["title"], norm=True, stem=True
    )
    poss_list: list[str] = []
    for word, tag in poss:
        if tag in ["Noun"] and len(word) > 1:
            poss_list.append(word)
    for word in poss_list:
        create_keyword(db, word, news_pk)


def create_keyword(db: Session, word: str, news_pk: int) -> None:
    existing_keyword: Optional[Keyword] = (
        db.query(Keyword).filter_by(keyword=word).first()
    )
    existing_stopword: Optional[Stopword] = (
        db.query(Stopword).filter_by(word=word).first()
    )
    existing_stock: Optional[Stock] = db.query(Stock).filter_by(corp_name=word).first()
    if existing_stopword:
        print("불용어입니다")
        return
    if existing_stock:
        db_news_stock: NewsStock = NewsStock(
            news_pk=news_pk, stock_code=existing_stock.stock_code
        )
        db.add(db_news_stock)
        db.commit()
    else:
        if not existing_keyword:
            db_keyword: Keyword = Keyword(keyword=word)
            db.add(db_keyword)
            db.commit()

        db_news_keyword: NewsKeyword = NewsKeyword(word=word, news_pk=news_pk, weight=1)
        db.add(db_news_keyword)
        db.commit()


def crawl(pre_article_url: str) -> list[dict]:
    # 크롤링할 페이지 URL 설정
    url_pattern: Pattern[str] = re.compile(r"https://[^;" "]+")
    origin_url: str = "https://finance.naver.com/news/mainnews.naver?&page="
    articles: list[dict] = []
    for page in range(1, 3):  # 한번의 시도에 최대 5페이지의 뉴스만 크롤링함
        url = origin_url + str(page)
        # 요청 시작
        response = requests.get(url)

        # HTTP 요청이 성공적인지 확인
        if response.status_code == 200:
            soup: BeautifulSoup = BeautifulSoup(response.text, "html.parser")

            # 뉴스 기사 목록을 포함한 부분을 찾습니다.
            news_list: BeautifulSoup = soup.find("ul", class_="newsList")
            # 뉴스 제목과 링크 수집
            news_articles: list[BeautifulSoup] = news_list.find_all("li")

            for article in news_articles:
                # 뉴스 제목 추출
                title: str = article.find("dd").text.strip()
                # 뉴스 본문 링크 가져오기
                article_link: str = article.find("a")["href"]
                # 뉴스 본문 페이지에 접근
                article_url: str = f"https://finance.naver.com{article_link}"
                pre_article_response: requests = requests.get(article_url)
                pre_article_soup: BeautifulSoup = BeautifulSoup(
                    pre_article_response.text, "html.parser"
                )
                href_url: str = pre_article_soup.find("script").text

                match: Optional[Match[str]] = url_pattern.search(href_url)
                if match:
                    urls = match.group().rstrip("'")
                    print("href_url", urls)
                new_article_url = urls
                article_response = requests.get(new_article_url)
                article_soup = BeautifulSoup(article_response.text, "html.parser")
                if new_article_url == pre_article_url:
                    return articles
                if article_response.status_code == 200:
                    article_soup: BeautifulSoup = BeautifulSoup(
                        article_response.text, "html.parser"
                    )
                    # "link_news" 클래스를 가진 요소를 찾아서 제거합니다.
                    link_news_element_list: list[BeautifulSoup] = article_soup.find_all(
                        "div", class_="link_news"
                    )
                    for link_news_element in link_news_element_list:
                        link_news_element.decompose()
                    # 뉴스 본문 추출 (articleCont 내부 텍스트만 추출)
                    try:
                        article_content: str = (
                            article_soup.find("div", id="newsct_article")
                            .get_text(separator=" ")
                            .strip()
                        )
                        print("차있음")
                    except:
                        print("비어있음")
                        continue

                    # 데이터 프레임 만들기 위한 제목, 본문
                    articles.append(
                        {
                            "title": title,
                            "content": article_content,
                            "url": new_article_url,
                        }
                    )
                    print("아티클스", articles)
                else:
                    print(f"뉴스 본문 페이지에 접근할 수 없습니다: {article_url}")
        else:
            print("페이지를 가져올 수 없습니다.")
    print(articles)
    return articles
