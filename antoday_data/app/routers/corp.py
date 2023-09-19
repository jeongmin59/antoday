from fastapi import APIRouter, Query
from app.schemas.price import MarketInfoDTO
from app.services.price_service import get_market_info
from app.services.stock_info_service import get_stock_price

router = APIRouter(
    prefix="/info/corp",
    tags=["corp"]
)

@router.get("/hot")
async def get_value_KSQSTK():
    response_data = {
        "msg":"sample api"
    }
    return response_data

@router.get("/stock")
async def get_stock_pricedata(
    stock_code: str = Query(regex="^[0-9]+$"),
    date_option: str = Query()
):
    response_data = get_stock_price(stock_code, date_option)
    return response_data
