from datetime import date, timedelta
import json
import requests
from bs4 import BeautifulSoup
import FinanceDataReader as fdr
from app.models.database import SessionLocal
from app.models.stock_models import Stock
from app.schemas.corp import CorpListDTO, DefaultPriceDTO

def get_hot_corp_list():
    kospi_corp_list = scrape_hot_corp("KOSPI")
    kosdaq_corp_list = scrape_hot_corp("KOSDAQ")

    hot_corp_list = get_stock_info(kospi_corp_list + kosdaq_corp_list)
    corpListDTO = [CorpListDTO(**corp) for corp in hot_corp_list]
    return corpListDTO

def get_cold_corp_list():
    corp_list = scrape_cold_corp()
    cold_corp_list = get_stock_info(corp_list)
    corpListDTO = [CorpListDTO(**corp) for corp in cold_corp_list]
    return corpListDTO

def get_price_info(stock_code: str, target_date: date):
    start_date = target_date - timedelta(days=1)
    df = fdr.DataReader(stock_code, start_date.strftime('%Y-%m-%d'), target_date.strftime('%Y-%m-%d'))
    
    # 해당 날짜 종가 반환 (해당 날짜 데이터가 없으면 전일종가 반환)
    price = int(df.iloc[-1]["Close"]) if target_date.strftime('%Y-%m-%d') in df.index else int(df.iloc[-2]["Close"])    
    return DefaultPriceDTO(stock_code=stock_code, price=price)

# 거래량순 스크래핑
def scrape_hot_corp(status):
    if status == "KOSPI":
        sosok = 0
    elif status == "KOSDAQ":
        sosok = 1

    url = f"https://finance.naver.com/sise/sise_quant.naver?sosok={sosok}"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', class_='type_2')

    corp_list = []

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

                corp_list.append(corp_info)
    
    return corp_list

# 업종대비 저PER 종목 스크래핑
def scrape_cold_corp():
    url = "https://comp.fnguide.com/SVO2/json/data/NH/VALUATION_U_LOW_PER.json?t=1695219322539"

    response = requests.get(url)
    if response.status_code == 200:
        # UTF-8 BOM 제거
        text = response.text.lstrip('\ufeff')
        data = json.loads(text)

        corp_list = [{"corp_name": item['ITEMABBRNM']} for item in data['comp'][:20]]
        return corp_list

# 기업명으로 종목코드, 로고 Url 조회
def get_stock_info(corp_list):
    corp_info_list = []
    
    with SessionLocal() as db:
        stocks = db.query(Stock).filter(Stock.corp_name.in_(corp["corp_name"] for corp in corp_list)).all()
        stock_dict = {stock.corp_name: {'stock_code': stock.stock_code, 'logo_url': stock.logo_url} for stock in stocks}

        for corp in corp_list:
            corp_name = corp['corp_name']
            if corp_name in stock_dict:
                corp.update(stock_dict[corp_name])
                corp_info_list.append(corp)

        if all('volume' in corp for corp in corp_info_list):
            corp_info_list.sort(key=lambda x: x["volume"], reverse=True)
        corp_info_list = corp_info_list[:10]

    return corp_info_list