from pydantic import BaseModel

class PriceDTO(BaseModel):
    base_date: str
    price: str
    percentage_change: str
    price_change: str

class MarketInfoDTO(BaseModel):
    KOSPI: PriceDTO
    KOSDAQ: PriceDTO