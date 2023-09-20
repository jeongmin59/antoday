from app.models.database import SessionLocal
from app.models.stock_models import Stock
from app.schemas.corp import CorpListDTO
import requests
from bs4 import BeautifulSoup

def get_hot_corp_list():
    kospi_corp_list = scraping_hot_corp("KOSPI")
    kosdaq_corp_list = scraping_hot_corp("KOSDAQ")
    
    corpList = []

    with SessionLocal() as db:
        stocks = db.query(Stock).filter(Stock.corp_name.in_(corp["corp_name"] for corp in kospi_corp_list + kosdaq_corp_list)).all()
        # Stock 레코드를 가져와서 corp_name을 키로 하는 딕셔너리를 생성
        stock_dict = {stock.corp_name: {'stock_code': stock.stock_code, 'logo_url': stock.logo_url} for stock in stocks}

        for corp in kospi_corp_list + kosdaq_corp_list:
            corp_name = corp['corp_name']
            if corp_name in stock_dict:
                
                # stock_code 및 logo_url을 가져와서 추가
                corp.update(stock_dict[corp_name])
                corpList.append(corp)
            print(corp)

        corpList.sort(key=lambda x: x["volume"], reverse=True)
        corpList = corpList[:10]

    corpListDTO = [CorpListDTO(**corp) for corp in corpList]
    
    return corpListDTO

def get_cold_corp_list():
    corpList = sample_cold_corp()
    corpListDTO = [CorpListDTO(**corp) for corp in corpList]
    return corpListDTO

# 네이버페이 증권 스크래핑
def scraping_hot_corp(status):  
    if status == "KOSPI":
        sosok = 0
    elif status == "KOSDAQ":
        sosok = 1

    url = f"https://finance.naver.com/sise/sise_quant.naver?sosok={sosok}"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', class_='type_2')

    corpList = []

    if table:
        rows = table.find_all('tr')[2:25]

        for row in rows:
            columns = row.find_all('td')
            
            if len(columns) >= 11:
                rank = columns[0].get_text().strip()
                name = columns[1].find('a', class_='tltle').get_text().strip()
                volume = int(columns[5].get_text().strip().replace(',', ''))
                
                corp_info = {
                    "rank": rank,
                    "corp_name": name,
                    "volume": volume,
                }

                corpList.append(corp_info)
    
    return corpList


def sample_cold_corp():
    sample = [
        {
            "stock_code": "078150",
            "corp_name": "HB테크놀러지",
            "price": 3315,
            "change": 100,
            "change_percent": -2.93,
            "volume": 24982187,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-078150.png"
        },
        {
            "stock_code": "088800",
            "corp_name": "에이스테크",
            "price": 3800,
            "change": 875,
            "change_percent": 29.91,
            "volume": 23046585,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-088800.png"
        },
        {
            "stock_code": "380540",
            "corp_name": "옵티코어",
            "price": 1889,
            "change": 181,
            "change_percent": 10.6,
            "volume": 22348490,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-380540.png"
        },
        {
            "stock_code": "100590",
            "corp_name": "머큐리",
            "price": 8900,
            "change": 10,
            "change_percent": 0.11,
            "volume": 21866026,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-100590.png"
        },
        {
            "stock_code": "050890",
            "corp_name": "쏠리드",
            "price": 6960,
            "change": 1120,
            "change_percent": 19.18,
            "volume": 21746873,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-050890.png"
        },
        {
            "stock_code": "034020",
            "corp_name": "두산에너빌리티",
            "price": 17900,
            "change": 880,
            "change_percent": 5.17,
            "volume": 16985221,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-034020.png"
        },
        {
            "stock_code": "214610",
            "corp_name": "미코바이오메드",
            "price": 5890,
            "change": 320,
            "change_percent": 5.75,
            "volume": 16269238,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-214610.png"
        },
        {
            "stock_code": "042370",
            "corp_name": "비츠로테크",
            "price": 8470,
            "change": 1350,
            "change_percent": 18.96,
            "volume": 15165567,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-042370.png"
        },
        {
            "stock_code": "226340",
            "corp_name": "본느",
            "price": 2710,
            "change": 70,
            "change_percent": 2.65,
            "volume": 15048847,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-226340.png"
        },
        {
            "stock_code": "010170",
            "corp_name": "대한광통신",
            "price": 1839,
            "change": 198,
            "change_percent": 12.07,
            "volume": 14380184,
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-010170.png"
        }
    ]
    return sample