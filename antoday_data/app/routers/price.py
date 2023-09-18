from fastapi import APIRouter
from app.schemas.price import MarketInfoDTO
from app.services.price_service import get_market_info

router = APIRouter(
    prefix="/info/price",
    tags=["price"]
)

@router.get("/KSQSTK", response_model=MarketInfoDTO)
async def get_value_KSQSTK():
    response_data = get_market_info("KS11", "KQ11")
    return response_data