from fastapi import FastAPI
from app.routers import price, corp
from app.models.database import SessionLocal, engine, Base
from app.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(price.router)
app.include_router(corp.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}