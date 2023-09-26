uvicorn app.main:app --reload
pip freeze > requirements.txt

python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
