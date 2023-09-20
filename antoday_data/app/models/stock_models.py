from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Stock(Base):
    __tablename__ = "stock"
    
    stock_code = Column(String, primary_key=True, index=True)
    corp_code = Column(String)
    corp_name = Column(String)
    market = Column(String)
    stocks = Column(Integer)
    logo_url = Column(Text)
