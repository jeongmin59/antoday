import FinanceDataReader as fdr
import datetime
from dateutil.relativedelta import relativedelta
from app.schemas.stocks import StocksDTO
import pandas as pd

def get_stock_info(stock_code) : 

    response_data = {
        "msg" : "하고싶어ㅜㅜ" 
    }

    return response_data

def get_stock_price(stock_code, date_option) :
    start_date = get_start_date(date_option)

    df = fdr.DataReader(stock_code, start_date)

    # print(df.index.tolist())

    response_data = StocksDTO(
        base_date=start_date,
        # arr=dataframes
        close=df['Close'].tolist(),
        date=df.index.tolist()
    )

    return response_data

def get_start_date(date_option):
    cur_date = datetime.datetime.now()

    date_option = date_option.split(' ')
    num = int(date_option[0])
    option = date_option[1]

    if(option == "개월") :
        cur_date = cur_date - relativedelta(months=num)
    elif(option == "년") :
        cur_date = cur_date - relativedelta(years=num)

    return cur_date.strftime('%Y-%m-01')