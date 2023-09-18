from fastapi import FastAPI
from app.routers import price
from app.routers import corp

app = FastAPI()

app.include_router(price.router)
app.include_router(corp.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}