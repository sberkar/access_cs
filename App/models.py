from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

now = datetime.now()
time = now.strftime(" %d/%m/%Y %H:%M:%S")

class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(60))
    note = Column(String(10000))
    created_at = Column(String, default=time)
    userid = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    uid = Column(String, unique=True)
    name = Column(String())
    img_url = Column(String())
    
    items = relationship("Note", back_populates="owner")