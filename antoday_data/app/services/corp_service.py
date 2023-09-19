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
                price = columns[2].get_text().strip().replace(',', '')
                change = columns[3].get_text().strip().replace(',', '')
                change_percent_text = columns[4].get_text().strip()
                volume = columns[5].get_text().strip().replace(',', '')

                # "+" 기호가 있는지 확인 후 제거
                if '+' in change_percent_text:
                    change_percent_text = change_percent_text.strip('+')

                # 백분율 기호(%) 제거
                change_percent = float(change_percent_text.strip('%'))

                # 숫자로 변환
                price = int(price)
                change = int(change)
                volume = int(volume)
                
                corp_info = {
                    "rank": rank,
                    "corp_name": name,
                    "price": price,
                    "change": change,
                    "change_percent": change_percent,
                    "volume": volume,
                }

                corpList.append(corp_info)
    
    return corpList