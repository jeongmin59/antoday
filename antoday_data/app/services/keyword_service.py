from collections import defaultdict
import re
from typing import Optional, Pattern, Match
from bs4 import BeautifulSoup
import requests
from sqlalchemy import ResultProxy, text
from app.schemas.corp import CorpListDTO
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
    query = text(
        """
        WITH kns AS (
            SELECT DISTINCT n.news_pk, n.textmining_pk
            FROM (
                SELECT textmining_pk
                FROM textmining
                ORDER BY textmining_pk DESC
                LIMIT 3
            ) AS t
            JOIN news n ON n.textmining_pk = t.textmining_pk
            JOIN news_keyword nk ON nk.news_pk = n.news_pk
            JOIN keyword k ON nk.word = k.keyword
        )
        SELECT kns.textmining_pk, nk.news_pk, nk.word
        FROM kns
        JOIN news_keyword nk ON nk.news_pk = kns.news_pk
        ORDER BY kns.textmining_pk DESC, nk.news_pk, nk.word
    """
    )
    res: ResultProxy = db.execute(query)
    pre_tpk: int = 0
    pre_npk: int = 0
    pre_word: str = ""
    tm_weight: float = 1.2
    word_dic: defaultdict = defaultdict(float)
    for tpk, npk, word in res:
        if pre_tpk != tpk:
            tm_weight -= 0.2
            pre_tpk = tpk
        if pre_npk == npk and pre_word == word:
            word_dic[word] += 0.2 * tm_weight
        else:
            word_dic[word] += tm_weight
        pre_npk = npk
        pre_word = word
    keywordDtoList: list[KeywordDTO] = []
    cnt = 0
    for word, weight in sorted(word_dic.items(), key=lambda x: -x[1]):
        if cnt >= 25:
            break
        cnt += 1
        keywordDtoList.append(KeywordDTO(label=word, value=weight))
    return keywordDtoList


def get_keyword_keywords(db: Session, keyword: str) -> list[KeywordDTO]:
    query = text(
        """
        WITH kns AS (
            SELECT DISTINCT n.news_pk, n.textmining_pk
            FROM (
                SELECT textmining_pk
                FROM textmining
                ORDER BY textmining_pk DESC
                LIMIT 3
            ) AS t
            JOIN news n ON n.textmining_pk = t.textmining_pk
            JOIN news_keyword nk ON nk.news_pk = n.news_pk
            JOIN keyword k ON nk.word = k.keyword
            WHERE k.keyword = :keyword
        )
        SELECT kns.textmining_pk, nk.news_pk, nk.word
        FROM kns
        JOIN news_keyword nk ON nk.news_pk = kns.news_pk
        ORDER BY kns.textmining_pk DESC, nk.news_pk, nk.word
    """
    )
    params: dict = {"keyword": keyword}
    res: ResultProxy = db.execute(query, params)
    pre_tpk: int = 0
    pre_npk: int = 0
    pre_word: str = ""
    tm_weight: float = 1.2
    word_dic: defaultdict = defaultdict(float)
    for tpk, npk, word in res:
        if pre_tpk != tpk:
            tm_weight -= 0.2
            pre_tpk = tpk
        if pre_npk == npk and pre_word == word:
            word_dic[word] += 0.2 * tm_weight
        else:
            word_dic[word] += tm_weight
        pre_npk = npk
        pre_word = word
    keywordDtoList: list[KeywordDTO] = []
    cnt = 0
    for word, weight in sorted(word_dic.items(), key=lambda x: -x[1]):
        if cnt >= 25:
            break
        cnt += 1
        keywordDtoList.append(KeywordDTO(label=word, value=weight))
    return keywordDtoList


def get_corp_keywords(db: Session, corp_name: str) -> list[KeywordDTO]:
    query = text(
        """
        with kns as (
            select distinct n.news_pk, n.textmining_pk
            from (
                select textmining_pk
                from textmining
                order by textmining_pk desc
                limit 5
                ) as t
            join news n on n.textmining_pk = t.textmining_pk
            join news_stock ns on ns.news_pk = n.news_pk
            join stock s on ns.stock_code = s.stock_code
            where s.corp_name = :corp_name
        )
        select kns.textmining_pk, nk.news_pk, nk.word
        from kns
        join news_keyword nk on nk.news_pk = kns.news_pk
        order by kns.textmining_pk desc, nk.news_pk, nk.word;
    """
    )
    params: dict = {"corp_name": corp_name}
    res: ResultProxy = db.execute(query, params)
    pre_tpk: int = 0
    pre_npk: int = 0
    pre_word: str = ""
    tm_weight: float = 1.2
    word_dic: defaultdict = defaultdict(float)
    for tpk, npk, word in res:
        if pre_tpk != tpk:
            tm_weight -= 0.2
            pre_tpk = tpk
        if pre_npk == npk and pre_word == word:
            word_dic[word] += 0.2 * tm_weight
        else:
            word_dic[word] += tm_weight
        pre_npk = npk
        pre_word = word
    keywordDtoList: list[KeywordDTO] = []
    max_weight = 0
    for word, weight in sorted(word_dic.items(), key=lambda x: -x[1]):
        max_weight = max(weight, max_weight)
        if weight <= max(2, max_weight / 10):
            break
        keywordDtoList.append(KeywordDTO(label=word, value=weight))
    return keywordDtoList


def get_keyword_corps(db: Session, keyword: str) -> list[CorpListDTO]:
    query = text(
        """
        with kns as (
            select distinct n.news_pk, n.textmining_pk
            from (
                select textmining_pk
                from textmining
                order by textmining_pk desc
                limit 5
                ) as t
            join news n on n.textmining_pk = t.textmining_pk
            join news_keyword nk on nk.news_pk = n.news_pk
            join keyword k on nk.word = k.keyword
            where k.keyword = :keyword
        )
        select s.corp_name, s.stock_code, s.logo_url
        from kns
        join news_stock ns on ns.news_pk = kns.news_pk
        join stock s on s.stock_code = ns.stock_code
        group by s.stock_code
        order by count(*) desc limit 5;
        """
    )
    params: dict = {"keyword": keyword}
    res: ResultProxy = db.execute(query, params)
    corp_list: list[CorpListDTO] = []
    for corp_name, stock_code, logo_url in res:
        corp_list.append(
            CorpListDTO(stock_code=stock_code, corp_name=corp_name, logo_url=logo_url)
        )
    return corp_list


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
