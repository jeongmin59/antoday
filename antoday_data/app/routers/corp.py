from fastapi import APIRouter
from app.services.corp_service import get_hot_corp_list

router = APIRouter(
    prefix="/info/corp",
    tags=["corp"]
)

@router.get("/hot")
async def get_hot_corps():
    response_data = get_hot_corp_list()
    return response_data