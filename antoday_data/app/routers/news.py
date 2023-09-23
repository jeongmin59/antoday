from fastapi import APIRouter
from app.schemas.news import NewsListDTO
from app.services.news_service import get_news_list

router = APIRouter(prefix="/info/news", tags=["news"])


@router.get("/list", summary="오늘의 뉴스")
async def get_today_news():
    return get_news_list()
