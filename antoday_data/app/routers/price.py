from fastapi import APIRouter
from app.schemas.price import MarketInfoDTO
from app.services.price_service import get_market_info

router = APIRouter(prefix="/info/price", tags=["price"])


@router.get("/KSQSTK", response_model=MarketInfoDTO, summary="코스피/코스닥 지수 조회")
async def get_value_KSQSTK():
    return get_market_info("KS11", "KQ11")
