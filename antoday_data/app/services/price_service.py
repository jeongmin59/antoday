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

    print(KOSPI_base_date, KOSDAQ_base_date)

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
    df = fdr.DataReader(symbol)
    close_values = df.tail(2)["Close"]
    base_date = close_values.index[1].strftime("%Y-%m-%d")
    value_yesterday = close_values.iloc[0]
    close_price = close_values.iloc[1]

    price_change = close_price - value_yesterday
    percentage_change = (price_change / value_yesterday) * 100

    close_price_formatted = format_value(round(close_price, 2))
    percentage_change_formatted = format_value(percentage_change)
    price_change_formatted = format_value(round(price_change, 2))
    return (
        base_date,
        close_price_formatted,
        percentage_change_formatted,
        price_change_formatted,
    )
