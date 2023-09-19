from app.schemas.corp import CorpListDTO
import FinanceDataReader as fdr
from bs4 import BeautifulSoup
import requests

def get_hot_corp_list():
    corpList = []
    scraping_hot_corp("KOSPI", corpList)
    scraping_hot_corp("KOSDAQ", corpList)
    
    corpList.sort(key=lambda x: int(x["volume"].replace(",", "")), reverse=True)

    for corp in corpList:
        print(corp)
    
    corpListDTO = [CorpListDTO(**corp) for corp in corpList]
    
    return corpListDTO

# KOSPI, KOSDAQ 거래량 순 상위 20개 종목
def scraping_hot_corp(status, tempList):    
    if status == "KOSPI":
        sosok = 0
    elif status == "KOSDAQ":
        sosok = 1

    url = f"https://finance.naver.com/sise/sise_quant.naver?sosok={sosok}"
    
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find('table', class_='type_2')

    if table:
        rows = table.find_all('tr')[2:32]

        for row in rows:
            columns = row.find_all('td')
            
            if len(columns) >= 11:
                rank = columns[0].get_text().strip()
                name = columns[1].find('a', class_='tltle').get_text().strip()
                price = columns[2].get_text().strip()
                change = columns[3].get_text().strip()
                change_percent = columns[4].get_text().strip()
                volume = columns[5].get_text().strip()

                corp_info = {
                    "rank": rank,
                    "corp_name": name,
                    "price": price,
                    "change": change,
                    "change_percent": change_percent,
                    "volume": volume,
                }

                tempList.append(corp_info)