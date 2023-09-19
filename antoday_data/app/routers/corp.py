from fastapi import APIRouter, Query
from app.services.stock_info_service import get_stock_price
from app.services.corp_service import get_hot_corp_list, get_cold_corp_list

router = APIRouter(
    prefix="/info/corp",
    tags=["corp"]
)

@router.get("/hot")
async def get_hot_corps():
    response_data = get_hot_corp_list()
    return response_data

@router.get("/cold")
async def get_cold_corps():
    response_data = get_cold_corp_list()
    return response_data

@router.get("/stock")
async def get_stock_pricedata(
    stock_code: str = Query(regex="^[0-9]+$"),
    date_option: str = Query()
):
    response_data = get_stock_price(stock_code, date_option)
    return response_data