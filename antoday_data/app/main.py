from fastapi import FastAPI
from app.routers import price, corp, trade, keyword, news
from app.models.database import engine, get_db
from app.models import models
from app.routers.keyword import auto_save_textmining
from starlette.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],
)

app.include_router(price.router)
app.include_router(corp.router)
app.include_router(trade.router)
app.include_router(keyword.router)
app.include_router(news.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


# scheduler = BackgroundScheduler()


# @app.on_event("startup")
# def start_scheduler():
#     # 매일 8:45~ 16:45에 텍스트마이닝 실행 예약
#     hours_to_run = [23, 3, 5, 7, 9]
#     for hour in hours_to_run:
#         trigger = CronTrigger(hour=hour, minute=45)
#         scheduler.add_job(auto_save_textmining, trigger=trigger)
#     scheduler.start()


# @app.on_event("shutdown")
# def stop_scheduler():
#     scheduler.shutdown()
