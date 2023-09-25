from pydantic import BaseModel


class NewsListDTO(BaseModel):
    title: str
    content: str
    press: str
    date: str
    link: str
    image: str
