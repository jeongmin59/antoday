from datetime import date, timedelta
from app.models.database import SessionLocal
from app.models.stock_models import Stock
from app.schemas.corp import CorpListDTO, DefaultPriceDTO
import requests
from bs4 import BeautifulSoup
import FinanceDataReader as fdr

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

# 기본 매수가 조회 API
def get_price_info(stock_code: str, target_date: date):
    start_date = target_date - timedelta(days=1)
    df = fdr.DataReader(stock_code, start_date.strftime('%Y-%m-%d'), target_date.strftime('%Y-%m-%d'))
    
    # 해당 날짜 종가 반환 (해당 날짜 데이터가 없으면 전일종가 반환)
    price = int(df.iloc[-1]["Close"]) if target_date.strftime('%Y-%m-%d') in df.index else int(df.iloc[-2]["Close"])    
    return DefaultPriceDTO(stock_code=stock_code, price=price)

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
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-078150.png"
        },
        {
            "stock_code": "088800",
            "corp_name": "에이스테크",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-088800.png"
        },
        {
            "stock_code": "380540",
            "corp_name": "옵티코어",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-380540.png"
        },
        {
            "stock_code": "100590",
            "corp_name": "머큐리",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-100590.png"
        },
        {
            "stock_code": "050890",
            "corp_name": "쏠리드",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-050890.png"
        },
        {
            "stock_code": "034020",
            "corp_name": "두산에너빌리티",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-034020.png"
        },
        {
            "stock_code": "214610",
            "corp_name": "미코바이오메드",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-214610.png"
        },
        {
            "stock_code": "042370",
            "corp_name": "비츠로테크",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-042370.png"
        },
        {
            "stock_code": "226340",
            "corp_name": "본느",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-226340.png"
        },
        {
            "stock_code": "010170",
            "corp_name": "대한광통신",
            "logo_url": "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-010170.png"
        }
    ]
    return sample