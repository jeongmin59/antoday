from fastapi import APIRouter

router = APIRouter(
    prefix="/info/price",
    tags=["price"]
)

@router.get("/KSQSTK")
async def get_value_KSQSTK():
    return {"message": "test"}