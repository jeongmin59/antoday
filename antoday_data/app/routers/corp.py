from datetime import date
from fastapi import APIRouter, Query, Path
from app.services.stock_info_service import get_stock_price, get_stock_info
from app.services.corp_service import get_hot_corp_list, get_cold_corp_list, get_price_info, get_current_index_info

router = APIRouter(
    prefix="/info/corp",
    tags=["corp"]
)

@router.get("/hot")
async def get_hot_corps():
    return get_hot_corp_list()

@router.get("/cold")
async def get_cold_corps():
    return get_cold_corp_list()

@router.get("/price/{stockCode}")
async def get_default_buy_price(target_date: date, stockCode: str = Path(..., min_length=6, max_length=6)):
    return get_price_info(stockCode, target_date)

@router.get("/stock")
async def get_stock_pricedata(
    stock_code: str = Query(regex="^[0-9]+$"),
    date_option: str = Query()
):
    response_data = get_stock_price(stock_code, date_option)
    return response_data

@router.get("/overview")
async def get_cold_corps(
    stock_code: str = Query(regex="^[0-9]+$"),
):
    response_data = get_stock_info(stock_code)
    return response_data

@router.get("/index/{stockCode}")
async def get_current_stock_index(stockCode: str = Path(..., min_length=6, max_length=6)):
    return get_current_index_info(stockCode)