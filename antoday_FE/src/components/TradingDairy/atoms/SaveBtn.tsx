import React, { useState } from 'react';
import axios from 'axios';
import styles from './SaveBtn.module.css';
import { accessTokenAtom } from '../../../recoil/auth';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const SaveBtn: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  price,
  cnt,
  keywordList,
  reason,
  optionBuySell
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useRecoilValue(accessTokenAtom);
  const navigator = useNavigate();
  const handleSaveClick = async () => {
    setIsLoading(true);
    // console.log(tradingData)
    // 로직 수정 필요
    const requestBody = {
      cnt: cnt,
      keywords: keywordList,
      price: price,
      reason: reason,
      stockCode: stockCode,
      tradeAt: tradeAt,
      optionBuySell: optionBuySell
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACK_API_URL +
        `/api/trade`, requestBody, 
        { headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('매매이유작성 성공', response.data);
      navigator("/tradingrecord")
    } catch (error) {
      console.error('매매이유작성 실패', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // 기본 제출 동작 막음
    handleSaveClick(); // 클릭 이벤트 핸들러 호출
  };

  return (
    <form onSubmit={handleFormSubmit}>
    <button
      type='submit'
      className={styles.saveButton}
      onClick={handleSaveClick}
      disabled={isLoading}
    >
      {isLoading ? '등록 중...' : '등록하기'}
    </button>
    </form>
  );
};

export default SaveBtn;
