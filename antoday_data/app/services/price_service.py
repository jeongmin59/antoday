import datetime
import math
from app.schemas.price import MarketInfoDTO, PriceDTO
import FinanceDataReader as fdr


def get_market_info(KOSPI_symbol, KOSDAQ_symbol):
    # KOSPI(STK - KS11)
    (
        KOSPI_base_date,
        KOSPI_close,
        kKOSPI_percentage_change,
        KOSPI_change,
    ) = get_calculate_KSQSTK(KOSPI_symbol)
    # KOSDAQ(KSQ - KQ11)
    (
        KOSDAQ_base_date,
        KOSDAQ_close,
        KOSDAQ_percentage_change,
        KOSDAQ_change,
    ) = get_calculate_KSQSTK(KOSDAQ_symbol)

    response_data = MarketInfoDTO(
        KOSPI=PriceDTO(
            base_date=KOSPI_base_date,
            price=KOSPI_close,
            percentage_change=kKOSPI_percentage_change,
            price_change=KOSPI_change,
        ),
        KOSDAQ=PriceDTO(
            base_date=KOSDAQ_base_date,
            price=KOSDAQ_close,
            percentage_change=KOSDAQ_percentage_change,
            price_change=KOSDAQ_change,
        ),
    )

    return response_data


def format_value(val):
    return "{:.2f}".format(val)

def get_calculate_KSQSTK(symbol):
    today_date = datetime.date.today()
    now = today_date + datetime.timedelta(days=1)
    start_date = today_date - datetime.timedelta(days=8)

    df = fdr.DataReader(symbol, start_date, now)
    
    print(symbol)
    print(df)
    
    idx = -1
    for _ in range(len(df) - 1):
        close_index = df.iloc[idx]["Close"]
        if math.isnan(close_index):
            idx -= 1
        else:
            break
    
    yesterday_idx = idx - 1
    for _ in range(len(df)):
        yesterday_close_index = df.iloc[yesterday_idx]["Close"]
        if math.isnan(yesterday_close_index):
            yesterday_idx -= 1
        else:
            break

    change = close_index - yesterday_close_index
    percentage_change = (change / yesterday_close_index) * 100

    formatted_close_index = format_value(close_index)
    formatted_change = format_value(change)
    formatted_percentage_change = format_value(percentage_change)

    formatted_date = df.index[-1].date().strftime("%Y-%m-%d")

    return (
        formatted_date,
        formatted_close_index,
        formatted_percentage_change,
        formatted_change,
    )
