import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(BASE_DIR)
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')

secrets = json.loads(open(SECRET_FILE).read())

DB = secrets["DB"]

DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"
print(DB_URL)
engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False)

Base = declarative_base()