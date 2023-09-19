from pydantic import BaseModel

class CorpListDTO(BaseModel):
    # stock_code: str
    corp_name: str
    price: str
    change: str
    change_percent: str
    volume: str
    # logo_url: str