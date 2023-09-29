from fastapi import APIRouter
from app.schemas.trade import TradeDto
from app.services.trade_service import get_ai_analyze

router = APIRouter(prefix="/info/trade", tags=["ai trade"])


@router.put("/analyze", summary="ai 결과 분석 요청 및 저장")
async def get_value_KSQSTK(trade_detail: TradeDto):
    return get_ai_analyze(trade_detail)
