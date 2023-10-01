import axios from "axios";
import BasicButton from "./BasicButton";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

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
  tradePk
}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const token = useRecoilValue(accessTokenAtom);
  const navigator = useNavigate();

  const handleSaveClick = async () => {
    setIsLoading(true);
    console.log('클릭이?????')
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
  </div>
  );
};

export default EditingSubmitButton;
