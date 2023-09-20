from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, TEXT
from sqlalchemy.orm import relationship

from .database import Base

class Textmining(Base):
    __tablename__ = "textmining"
    textmining_pk = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

class News(Base):
    __tablename__ = "news"
    news_pk = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(TEXT)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)