from pydantic import BaseModel

class CorpListDTO(BaseModel):
    stock_code: str
    corp_name: str
    logo_url: str