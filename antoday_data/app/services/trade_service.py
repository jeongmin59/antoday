import os
import openai
import json
from app.models.database import SessionLocal
from app.models.models import Trade


def get_ai_analyze(trade_detail):
    messages = make_messages(trade_detail)
    result = ask_gpt(messages)
    if result != -1:
        get_stock_num(trade_detail.tradePk, result)
        return result
    else:
        return "AI분석에 실패하였습니다."


# gpt로 메세지 물어보기
def ask_gpt(messages):
    # api key
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SECRET_FILE = os.path.join(BASE_DIR, "secrets.json")
    secrets = json.loads(open(SECRET_FILE).read())
    keys = secrets["OPENAI"]
    openai.api_key = keys["api_key"]

    # send message
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.9,
            max_tokens=1000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )

        return response.choices[0].message.content
    except:
        return -1


# trade detail정보를 이용하여 message작성
def make_messages(detail):
    reason = f"""Buy(0)/Sell(1) classification : {detail.optionBuySell} 
    Stock Name,code = {detail.corpName}, {detail.stockCode}
    reason : {detail.reason}
    Related keyword : {detail.keyword}
    time : {detail.tradeAt}
    """

    messages = [
        {
            "role": "user",
            "content": "I bought/sold stocks for that reason. Analyze whether my reasons are valid. (Please answer in Korean, Within 10 seconds)",
        },
        {
            "role": "user",
            "content": reason,
        },
        {
            "role": "system",
            "content": "You are an investment analysis expert and friendly consultant.",
        },
    ]
    return messages


# trade pk의 reason 업데이트
def get_stock_num(pk, result):
    with SessionLocal() as db:
        update_analyze = db.query(Trade).filter_by(trade_pk=pk).first()
        print(update_analyze)
        update_analyze.ai_analyze = result
        db.add(update_analyze)
        db.commit()

    return
