import axios from "axios";
import BasicButton from "./BasicButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../../Common/atom/Alert";
import { isAlertOpenAtom } from "../../../recoil/alert";

interface EditingSubmitButtonProps {
  editedTradeAt?: Date;
  editedCorpName?: string;
  editedOptionBuySell?: string;
  editedPrice?: number;
  editedCnt?: number;
  keywords?: string[];
  editedReason?: string;
  stockCode?: number;
  tradePk?: string;
}

const EditingSubmitButton: React.FC<EditingSubmitButtonProps> = ({
  editedTradeAt,
  editedCorpName,
  editedOptionBuySell,
  editedPrice,
  editedCnt,
  keywords,
  editedReason,
  stockCode,
  tradePk,
}) => {
  console.log("점검", keywords);
  const [isLoading, setIsLoading] = useState(false);
  const [pricewrong, setPricewrong] = useState(false);
  const [cntwrong, setCntwrong] = useState(false);
  const token = useRecoilValue(accessTokenAtom);
  const navigator = useNavigate();
  const setAlertState = useSetRecoilState(isAlertOpenAtom);

  const handleSaveClick = async () => {
    if (editedPrice <= 0) {
      setPricewrong(true);
      setAlertState({ isOpen: true, status: "" });
      setTimeout(() => setPricewrong(false), 3000);
      return;
    } else if (editedCnt <= 0) {
      setCntwrong(true);
      setAlertState({ isOpen: true, status: "" });
      setTimeout(() => setCntwrong(false), 3000);
      return;
    }
    setIsLoading(true);
    console.log("클릭이?????");
    const requestBody = {
      cnt: editedCnt,
      keywords: keywords,
      price: editedPrice,
      reason: editedReason,
      stockCode: stockCode,
      tradeAt: editedTradeAt,
      optionBuySell: editedOptionBuySell,
      tradePk: tradePk,
    };

    try {
      const response = await axios.put(
        import.meta.env.VITE_BACK_API_URL + `/api/trade`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("수정 성공", response.data);
      navigator("/tradingrecord");
    } catch (error) {
      console.error("수정 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={handleSaveClick}>
      <BasicButton text={isLoading ? "수정 중" : "수정"} />
      {cntwrong ? <Alert msg={"매매 개수는 1개 이상이어야 합니다."} /> : null}
      {pricewrong ? (
        <Alert msg={"매수,매도가는 1원 이상이어야 합니다."} />
      ) : null}
    </div>
  );
};

export default EditingSubmitButton;
