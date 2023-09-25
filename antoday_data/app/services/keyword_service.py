import string
from typing import Optional
from bs4 import BeautifulSoup
import requests
from sqlalchemy import Transaction
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
from requests.models import Response
from konlpy.tag import Okt
from tqdm import tqdm


def create_stopword(db: Session, word: str) -> None:
    db_stopword: Stopword = Stopword(word=word)
    existing_keyword: Optional[Stopword] = (
        db.query(Stopword).filter_by(word=word).first()
    )
    if not existing_keyword:
        db_stopword = Stopword(word=word)
        db.add(db_stopword)
    db.commit()


def get_keywords(db: Session) -> list[KeywordDTO]:
    return


def create_textmining(db: Session) -> None:
    try:
        db_textmining: Textmining = Textmining()
        db.add(db_textmining)
        db.commit()  # 텍스트마이닝 단위 생성
        textmining_pk = (
            db.query(Textmining)
            .order_by(Textmining.textmining_pk.desc())
            .first()
            .textmining_pk
        )
        # 가장 최근 뉴스의 url을 가져옴
        temp_news: str = db.query(News).order_by(News.news_pk.desc()).first()
        if temp_news:
            pre_article_url: str = (
                db.query(News).order_by(News.news_pk.desc()).first().url
            )
        else:
            pre_article_url = "dd"
        print("여기야 여기!!!", pre_article_url)
        articles: list[dict] = crawl(pre_article_url)  # 해당 뉴스 전까지의 모든 뉴스 크롤링
        print("크롤완료", articles)
        for article in articles:
            create_news(db, article, textmining_pk)  # 뉴스별로 텍스트 추출
    except Exception as e:
        db.rollback()
        raise e


def create_news(db: Session, article: dict, textmining_pk: str) -> None:  # 뉴스 하나 만드는 함수
    print(article)
    url: str = article["url"]
    db_news: News = News(url=url, textmining_pk=textmining_pk)
    db.add(db_news)
    db.commit()
    news_pk: int = db.query(News).order_by(News.news_pk.desc()).first()
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
        db.query(Keyword).filter_by(word=word).first()
    )
    if not existing_keyword and not existing_stopword:
        existing_stock: Optional[Stock] = (
            db.query(Stock).filter_by(corp_name=word).first()
        )
        if existing_stock:
            db_news_stock: NewsStock = NewsStock(
                news_pk=news_pk, stock_code=existing_stock.stock_code
            )
            db.add(db_news_stock)
            db.commit()
        else:
            db_keyword: Keyword = Keyword(keyword=word)
            db.add(db_keyword)
            db_news_keyword: NewsKeyword = NewsKeyword(
                keyword_word=word, new_pk=news_pk, weight=1
            )
            db.add(db_news_keyword)
            db.commit()


def crawl(pre_article_url: string) -> list[dict]:
    # 크롤링할 페이지 URL 설정
    origin_url = "https://finance.naver.com/news/mainnews.naver?&page="
    articles: list[dict] = []
    for page in range(1, 2):  # 한번의 시도에 최대 9페이지의 뉴스만 크롤링함
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
                print(article)
                title: str = article.find("dd").text.strip()
                # 뉴스 본문 링크 가져오기
                article_link: str = article.find("a")["href"]
                # 뉴스 본문 페이지에 접근
                article_url: str = f"https://finance.naver.com{article_link}"
                article_response: Response = requests.get(article_url)

                if article_url[0:-2] == pre_article_url[0:-2]:  # 페이지 무시
                    return articles
                if article_response.status_code == 200:
                    article_soup: BeautifulSoup = BeautifulSoup(
                        article_response.text, "html.parser"
                    )
                    print("아티클수프", article_soup.find_all("div"))
                    # "link_news" 클래스를 가진 요소를 찾아서 제거합니다.
                    link_news_element_list: list[BeautifulSoup] = article_soup.find_all(
                        "div", class_="link_news"
                    )
                    for link_news_element in link_news_element_list:
                        link_news_element.decompose()
                    print("링크뉴스", link_news_element_list)
                    # 뉴스 본문 추출 (articleCont 내부 텍스트만 추출)
                    print(article_soup.find("div", id="content"))
                    try:
                        article_content: str = (
                            article_soup.find("div", id="content")
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
                            "url": article_url[0:-2],
                        }
                    )
                else:
                    print(f"뉴스 본문 페이지에 접근할 수 없습니다: {article_url}")
        else:
            print("페이지를 가져올 수 없습니다.")
    print(articles)
    return articles
