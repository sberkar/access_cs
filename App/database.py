from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQL_DB_URI = "sqlite:///./noteApp.db"

engine = create_engine(SQL_DB_URI, connect_args={
    "check_same_thread": False
})

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()