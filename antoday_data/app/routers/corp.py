from fastapi import APIRouter
from app.schemas.price import MarketInfoDTO
from app.services.price_service import get_market_info

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