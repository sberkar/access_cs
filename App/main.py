from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schema
from database import engine, sessionLocal

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = sessionLocal()
    try: 
        yield db
    finally:
        db.close()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/notes/{uid}", response_model=List[schema.ShowNote], tags=["Note"])
def get_all_notes(uid, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.uid == uid).first()
    if not user:
        return {
            "msg": "No Note found"
        }
    return user.items 

@app.get("/api/note/{id}/{uid}", response_model=schema.ShowNote, tags=["Note"])
def get_note_by_id(id: int, uid, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.uid == uid)
    if not user.first():
        return {
            "msg": "sorry no note found"
        }
    user_obj = user.first()
    note = db.query(models.Note).filter(models.Note.id == id, models.Note.userid == user_obj.id)
    if not note.first():
        raise HTTPException(status_code=404, detail={"msg": "note not found"})
    return note.first()

@app.post("/api/note", tags=["Note"])
def create_note(note: schema.CreateNote, db: Session = Depends(get_db)):
    get_user = db.query(models.User).filter(models.User.uid == note.uid).first()
    if get_user:
        note_obj = models.Note(title= note.title, note=note.note, userid=get_user.id)
        db.add(note_obj)
        db.commit()
        db.refresh(note_obj)
        return note_obj

@app.put("/api/note/{id}/{uid}", tags=["Note"])
def update_note(id: int, uid, note: schema.UpdateNote, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.uid == uid).first()
    if not user:
        return {
            "msg" : "note not found"
        }
    note_from_db = db.query(models.Note).filter(models.Note.id == id, models.Note.userid == user.id)
    if not note_from_db.first():
        return {
            "msg": "note not found"
        }
    note_from_db.update(note.dict(exclude_unset=True))
    db.commit()
    return db.query(models.Note).filter(models.Note.id == id).first()

@app.delete("/api/note/{id}", tags=["Note"])
def delete_note(id: int, db: Session = Depends(get_db)):
    note_obj = db.query(models.Note).filter(models.Note.id == id)
    if not note_obj.first():
        return {
            "msg": "note not found"
        }
    note_obj.delete()
    db.commit()
    return {
        "msg": "Note Deleted Successfully"
    }

#Users

@app.get("/user/{id}", response_model=schema.ShowUser)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    userObj = db.query(models.User).filter(models.User.id == id)
    if not userObj.first():
        raise HTTPException(404, detail={
            "msg": "user not found"
        })
    return userObj.first()

@app.post("/api/user")
def create_user(request: schema.CreateUser, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.uid == request.uid)
    if not user.first():
        user_obj = models.User(uid = request.uid, name = request.name, img_url = request.img_url)
        db.add(user_obj)
        db.commit()
        db.refresh(user_obj)
        return user_obj
    return {
        "msg": "sorry an error occurred"
    }