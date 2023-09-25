from http import HTTPStatus
from fastapi import APIRouter, Depends
from app.models.database import get_db
from app.schemas.keyword import KeywordDTO
from app.services.keyword_service import *
from sqlalchemy.orm import Session

router = APIRouter(prefix="/info/keyword", tags=["keyword"])


@router.post("/stopword")
async def save_stopword(word: str, db: Session = Depends(get_db)) -> Optional[dict|HTTPStatus]:
    try :
        create_stopword(db, word)
        return {"status": "success"}
    except Exception as e:
        raise HTTPStatus(status_code=500, detail=str(e))


# @router.get("")
# async def get_wordcloud(db: Session = Depends(get_db)) -> list[KeywordDTO]:
#     return get_keywords(db)


# @router.post("")
# async def save_wordcloud(db: Session = Depends(get_db)) -> dict:
#     try:
#         create_keyword(db)
#         return {"status": "success"}
#     except Exception as e:
#         raise HTTPStatus(status_code=500, detail=str(e))


# @router.post("/tm")
# async def save_textmining(db: Session = Depends(get_db)) -> dict:
#     try:
#         create_textmining(db)
#         return {"status": "success"}
#     except Exception as e:
#         raise HTTPStatus(status_code=500, detail=str(e))
