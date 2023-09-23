from fastapi.responses import JSONResponse
import re
import requests
from bs4 import BeautifulSoup
from app.schemas.news import NewsListDTO


def get_news_list():
    url = "https://finance.naver.com/news/mainnews.naver"

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        news_articles = soup.find_all("li", class_="block1")

        news_data = []
        for article in news_articles[:5]:
            title = article.find("dd", class_="articleSubject").get_text(strip=True)
            content = (
                article.find("dd", class_="articleSummary")
                .get_text(strip=True)
                .split("..")[0]
                + ".."
            )
            press = article.find("span", class_="press").get_text(strip=True)
            date = article.find("span", class_="wdate").get_text(strip=True)

            thumb_image = article.find("img", src=True)["src"]

            part = thumb_image.split("thumb70/")[1].split("/")[0]
            match = re.search(r"/(\d+)\.jpg$", thumb_image).group(1).zfill(10)

            link = f"https://n.news.naver.com/mnews/article/{part}/{match}"

            img_response = requests.get(link)
            if img_response.status_code == 200:
                temp_soup = BeautifulSoup(img_response.text, "html.parser")
                image = temp_soup.find("img", id="img1").get("data-src")

            news_item = NewsListDTO(
                title=title,
                content=content,
                press=press,
                date=date,
                link=link,
                image=image
            )

            news_data.append(news_item)

        return news_data
    else:
        return JSONResponse(
            content={"error": "Failed to retrieve the webpage"}, status_code=500
        )
