import React, { useState, useEffect } from 'react';
import styles from './KospiKosdakIndex.module.css';
import axios from 'axios';

// 타입 정의
interface IndexData {
    base_date: string;
    price: string;
    percentage_change: string;
    price_change: string;
  }
  
interface MarketData {
    KOSPI: IndexData;
    KOSDAQ: IndexData;
}

const KospiKosdakIndex = () => {
  const [indexData, setIndexData] = useState<MarketData>({
    KOSPI: {
      base_date: '',
      price: '',
      percentage_change: '',
      price_change: ''
    },
    KOSDAQ: {
      base_date: '',
      price: '',
      percentage_change: '',
      price_change: ''
    }
  });

  useEffect(() => {
    // 백엔드 데이터 가져오기
    const getMarketData = async () => {
      try {
        const response = await axios.get<MarketData>(
          import.meta.env.VITE_DATA_API_URL + '/info/price/KSQSTK'
          );
        const data = response.data;
        setIndexData(data);
        console.log(data);
      } catch (error) {
        console.error('에러', error);
      }
    };

    getMarketData();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.title}>오늘의 지수</div>
        <div className={styles.indexContainer}>
          <div className={styles.indexTitle}>코스피</div>
          <div className={styles.indexContent}>
            {/* <p>기준일자: {indexData.KOSPI.base_date}</p> */}
            <p>현재지수: {indexData.KOSPI.price}</p>
            <p>등락률: {indexData.KOSPI.percentage_change}</p>
            <p>변화지수: {indexData.KOSPI.price_change}</p>
          </div>
        </div>
        <div className={styles.indexContainer}>
          <div className={styles.indexTitle}>코스닥</div>
          <div className={styles.indexContent}>
            {/* <p>기준일자: {indexData.KOSDAQ.base_date}</p> */}
            <p>현재지수: {indexData.KOSDAQ.price}</p>
            <p>등락률: {indexData.KOSDAQ.percentage_change}</p>
            <p>변화지수: {indexData.KOSDAQ.price_change}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KospiKosdakIndex;
