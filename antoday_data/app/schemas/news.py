from pydantic import BaseModel


class NewsListDTO(BaseModel):
    title: str
    content: str
    image: str
    press: str
    date: str
    link: str
