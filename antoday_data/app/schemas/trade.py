from typing import List
from pydantic import BaseModel
from datetime import datetime


class TradeDto(BaseModel):
    tradePk: int
    corpName: str
    stockCode: str
    optionBuySell: int
    price: int
    cnt: int
    tradeAt: datetime
    reason: str
    keyword: List[str]
