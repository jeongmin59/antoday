from pydantic import BaseModel


class KeywordDTO(BaseModel):
    label: str
    value: float
