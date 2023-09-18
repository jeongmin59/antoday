from fastapi import FastAPI
from app.routers import price

app = FastAPI()

app.include_router(price.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}