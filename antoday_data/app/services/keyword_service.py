import string
from typing import Optional
from bs4 import BeautifulSoup
import requests
from app.models.models import Keyword, News, Stopword, Textmining
from app.schemas.keyword import KeywordDTO
from sqlalchemy.orm import Session


def create_stopword(db: Session, word: str) -> None :
    db_stopword = Stopword(word=word)
    existing_keyword = db.query(Stopword).filter_by(word=word).first()
    if not existing_keyword:
        db_stopword = Stopword(word=word)
        db.add(db_stopword)
    db.commit()


def get_keywords(db: Session) -> list[KeywordDTO]:
    return


def create_textmining(db: Session) -> None:
    db_textmining = Textmining()
    db.add(db_textmining)
    db.commit()  # 텍스트마이닝 단위 생성
    textmining_pk = (
        db.query(Textmining)
        .order_by(Textmining.textmining_pk.desc())
        .first()
        .textmining_pk
    )
    try:  # 가장 최근 뉴스의 url을 가져옴
        temp = db.query(News).order_by(News.news_pk.desc()).first().url
    except:
        temp = ""
    pre_article_url: str = temp
    articles: list[dict] = crawl(pre_article_url)  # 해당 뉴스 전까지의 모든 뉴스 크롤링
    for article in articles:
        create_news(db, article, textmining_pk)  # 뉴스별로 텍스트 추출


def create_news(db: Session, article: dict, textmining_pk: str) -> None:
    url = article["url"]
    db_news = News(url=url, textmining_pk=textmining_pk)
    db.add(db_news)
    db.commit()
    news_pk = db.query(News).order_by(News.news_pk.desc()).first()

    return


def create_keyword(db: Session) -> None:
    words = ["삼성", "저것"]
    for word in words:
        existing_keyword = db.query(Keyword).filter_by(keyword=word).first()
        if not existing_keyword:
            db_keyword = Keyword(keyword=word)
            db.add(db_keyword)
    db.commit()


def crawl(pre_article_url: string) -> list[dict]:
    # 크롤링할 페이지 URL 설정
    origin_url = "https://finance.naver.com/news/mainnews.naver?&page="
    for page in range(1, 10):
        url = origin_url + str(page)
        # 요청 시작
        response = requests.get(url)
        articles = []

        # HTTP 요청이 성공적인지 확인
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")

            # 뉴스 기사 목록을 포함한 부분을 찾습니다.
            news_list = soup.find("ul", class_="newsList")

            # 뉴스 제목과 링크 수집
            news_articles = news_list.find_all("li")

            for article in news_articles:
                # 뉴스 제목 추출
                title = article.find("dd").text.strip()
                # 뉴스 본문 링크 가져오기
                article_link = article.find("a")["href"]
                # 뉴스 본문 페이지에 접근
                article_url = f"https://finance.naver.com{article_link}"

                article_response = requests.get(article_url)

                if article_url[0:-2] == pre_article_url[0:-2]:  # 페이지 무시
                    return articles
                if article_response.status_code == 200:
                    article_soup = BeautifulSoup(article_response.text, "html.parser")

                    # "link_news" 클래스를 가진 요소를 찾아서 제거합니다.
                    for link_news_element in article_soup.find_all(
                        "div", class_="link_news"
                    ):
                        link_news_element.decompose()

                    # 뉴스 본문 추출 (articleCont 내부 텍스트만 추출)
                    article_content = (
                        article_soup.find("div", id="content")
                        .get_text(separator=" ")
                        .strip()
                    )

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
    return articles
