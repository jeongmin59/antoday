from datetime import date
from fastapi import APIRouter, Query, Path
from app.services.stock_info_service import get_stock_price, get_stock_info
from app.services.corp_service import (
    get_hot_corp_list,
    get_cold_corp_list,
    get_price_info,
    get_current_index_info,
)

router = APIRouter(prefix="/info/corp", tags=["corp"])


@router.get("/hot", summary="HOT 기업 조회")
async def get_hot_corps():
    return get_hot_corp_list()


@router.get("/cold", summary="COLD 기업 조회")
async def get_cold_corps():
    return get_cold_corp_list()


@router.get("/price/{stockCode}", summary="일자별 매수가 조회")
async def get_default_buy_price(
    target_date: date, stockCode: str = Path(..., min_length=6, max_length=6)
):
    return get_price_info(stockCode, target_date)


@router.get("/stock", summary="주가(차트)")
async def get_stock_pricedata(
    stock_code: str = Query(regex="^[0-9]+$"), date_option: str = Query()
):
    response_data = get_stock_price(stock_code, date_option)
    return response_data


@router.get("/overview", summary="종목 정보 조회")
async def get_corps_overview(
    stock_code: str = Query(regex="^[0-9]+$"),
):
    response_data = get_stock_info(stock_code)
    return response_data


@router.get("/index/{stockCode}", summary="주가/전일비/등락률 조회")
async def get_current_stock_index(
    stockCode: str = Path(..., min_length=6, max_length=6)
):
    return get_current_index_info(stockCode)
