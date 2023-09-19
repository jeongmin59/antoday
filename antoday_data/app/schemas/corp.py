from pydantic import BaseModel

class CorpListDTO(BaseModel):
    stock_code: str
    corp_name: str
    price: int
    change: int
    change_percent: float
    volume: int
    logo_url: str