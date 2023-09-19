from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import price
from app.routers import corp

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