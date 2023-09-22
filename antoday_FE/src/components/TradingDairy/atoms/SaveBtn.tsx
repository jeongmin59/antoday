import React, { useState } from 'react';
import axios from 'axios';
import styles from './SaveBtn.module.css';
import { accessTokenAtom } from '../../../recoil/auth';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
// import { useRoute } from '@react-navigation/native';

const SaveBtn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token,setToken] = useRecoilState(accessTokenAtom);
  // const location = useLocation();
  // const tradingData = location.state;
  // const route = useRoute();
  // const { tradingdata } = route.params.state;
  

  const handleSaveClick = async () => {
    setIsLoading(true);
    // console.log(tradingData)
    // 로직 수정 필요
    const requestBody = {
      cnt: 0,
      keywords: ["string"],
      price: 0,
      reason: "string",
      stockCode: "string",
      tradeAt: "2023-09-13T01:04:06.982Z"
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACK_API_URL +
        `/api/trade`, requestBody, 
        { headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('API 호출 성공', response.data);
    } catch (error) {
      console.error('API 호출 실패', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={styles.saveButton}
      onClick={handleSaveClick}
      disabled={isLoading}
    >
      {isLoading ? '등록 중...' : '등록하기'}
    </button>
  );
};

export default SaveBtn;
function useRoute() {
  throw new Error('Function not implemented.');
}

