from datetime import datetime
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    BigInteger,
)
from sqlalchemy.orm import relationship
from .database import Base
import logging
from typing import Union

# SQLAlchemy 로깅 활성화
logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


class Textmining(Base):
    __tablename__ = "textmining"
    textmining_pk: Union[int, Column] = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True
    )
    created_at: Union[datetime, Column] = Column(DateTime, default=datetime.now)
    updated_at: Union[datetime, Column] = Column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )


class News(Base):
    __tablename__ = "news"
    news_pk: Union[int, Column] = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True
    )
    textmining_pk: Union[int, Column] = Column(
        BigInteger, ForeignKey("textmining.textmining_pk")
    )
    url: Union[str, Column] = Column(Text)
    created_at: Union[datetime, Column] = Column(DateTime, default=datetime.now)
    updated_at: Union[datetime, Column] = Column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    news_stocks = relationship("NewsStock", back_populates="news")
    news_keywords = relationship("NewsKeyword", back_populates="news")


class NewsStock(Base):
    __tablename__ = "news_stock"

    news_stock_pk: Union[int, Column] = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True
    )
    news_pk: Union[int, Column] = Column(BigInteger, ForeignKey("news.news_pk"))
    stock_code: Union[str, Column] = Column(String(255), ForeignKey("stock.stock_code"))
    created_at: Union[datetime, Column] = Column(DateTime, default=datetime.now)
    updated_at: Union[datetime, Column] = Column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    news = relationship("News", back_populates="news_stocks")
    stock = relationship("Stock", back_populates="stock_news")


class Stock(Base):
    __tablename__ = "stock"

    stock_code: Union[str, Column] = Column(String, primary_key=True, index=True)
    corp_code: Union[str, Column] = Column(String)
    corp_name: Union[str, Column] = Column(String)
    market: Union[str, Column] = Column(String)
    stocks: Union[int, Column] = Column(Integer)
    logo_url: Union[str, Column] = Column(Text)

    stock_news = relationship("NewsStock", back_populates="stock")


class Keyword(Base):
    __tablename__ = "keyword"
    keyword: Union[str, Column] = Column(
        String(255), primary_key=True, unique=True, index=True
    )
    created_at: Union[datetime, Column] = Column(DateTime, default=datetime.now)
    updated_at: Union[datetime, Column] = Column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    keyword_news = relationship("NewsKeyword", back_populates="keyword")


class NewsKeyword(Base):
    __tablename__ = "news_keyword"
    news_keyword_pk: Union[int, Column] = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True
    )
    weight: Union[float, Column] = Column(Float)
    keyword_word: Union[str, Column] = Column(
        String(255), ForeignKey("keyword.keyword")
    )
    new_pk: Union[int, Column] = Column(BigInteger, ForeignKey("news.news_pk"))
    created_at: Union[datetime, Column] = Column(DateTime, default=datetime.now)
    updated_at: Union[datetime, Column] = Column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    news = relationship("News", back_populates="news_keywords")
    keyword = relationship("Keyword", back_populates="keyword_news")
