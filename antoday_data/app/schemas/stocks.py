from typing import List
from pandas import Timestamp
from pydantic import BaseModel

class StocksDTO(BaseModel):
    base_date: str
    close: List[int]
    date: List[object]
