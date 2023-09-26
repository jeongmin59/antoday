from pydantic import BaseModel


class CorpListDTO(BaseModel):
    stock_code: str
    corp_name: str
    logo_url: str


class DefaultPriceDTO(BaseModel):
    stock_code: str
    price: int


class CorpIndexInfoDTO(BaseModel):
    stock_code: str
    corp_name: str
    market: str
    index: int
    change: int
    percentage_change: float
