from tkinter.tix import NoteBook
from typing import List, Optional
from pydantic import BaseModel

class CreateNote(BaseModel):
    title: str = None
    note: str = None
    uid: str = None

    class Config():
        orm_mode = True
class NoteShow(CreateNote):
    id: int

    class Config():
        orm_mode = True
class UpdateNote(BaseModel):
    title: str = None
    note: str = None

class CreateUser(BaseModel):
    uid: str
    name: str
    img_url: str

    class Config():
        orm_mode = True

class ShowNote(CreateNote):
    id: int
    owner: CreateUser
    created_at: str

    class Config():
        orm_mode = True
    
class ShowUser(CreateUser):
    id: int
    items: List[NoteShow] = []

    class Config():
        orm_mode = True