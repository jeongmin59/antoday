from pydantic import BaseModel

class KeywordDTO(BaseModel):
    text : str
    value: float