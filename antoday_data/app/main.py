from fastapi import FastAPI
from app.routers import price, corp
from app.models.database import SessionLocal, engine, Base
from app.models import models
from starlette.middleware.cors import CORSMiddleware
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"]
)

app.include_router(price.router)
app.include_router(corp.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}