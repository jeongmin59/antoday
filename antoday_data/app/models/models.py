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

# SQLAlchemy 로깅 활성화
logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


class Textmining(Base):
    __tablename__ = "textmining"
    textmining_pk = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)


class News(Base):
    __tablename__ = "news"
    news_pk = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    textmining_pk = Column(BigInteger, ForeignKey("textmining.textmining_pk"))
    url = Column(Text)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    news_stocks = relationship("NewsStock", back_populates="news")
    news_keywords = relationship("NewsKeyword", back_populates="news")


class NewsStock(Base):
    __tablename__ = "news_stock"

    news_stock_pk = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    news_pk = Column(BigInteger, ForeignKey("news.news_pk"))
    stock_code = Column(String(255), ForeignKey("stock.stock_code"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    news = relationship("News", back_populates="news_stocks")
    stock = relationship("Stock", back_populates="stock_news")


class Stock(Base):
    __tablename__ = "stock"

    stock_code = Column(String, primary_key=True, index=True)
    corp_code = Column(String)
    corp_name = Column(String)
    market = Column(String)
    stocks = Column(Integer)
    logo_url = Column(Text)

    stock_news = relationship("NewsStock", back_populates="stock")


class Keyword(Base):
    __tablename__ = "keyword"
    keyword = Column(String(255), primary_key=True, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    keyword_news = relationship("NewsKeyword", back_populates="keyword")


class NewsKeyword(Base):
    __tablename__ = "news_keyword"
    news_keyword_pk = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True
    )
    weight = Column(Float)
    keyword_word = Column(String(255), ForeignKey("keyword.keyword"))
    new_pk = Column(BigInteger, ForeignKey("news.news_pk"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    news = relationship("News", back_populates="news_keywords")
    keyword = relationship("Keyword", back_populates="keyword_news")


class Trade(Base):
    __tablename__ = "trade"

    trade_pk = Column(BigInteger, primary_key=True, autoincrement=True)
    ai_analyze = Column(String)
    cnt = Column(Integer)
    is_deleted = Column(Boolean)
    option_buy_sell = Column(Boolean)
    price = Column(Integer)
    reason = Column(String)
    trade_at = Column(DateTime)
    updated_at = Column(DateTime, onupdate=datetime.now)
    social_id = Column(BigInteger)
