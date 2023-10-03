import React, { useState, useEffect } from 'react';
import styles from './KospiKosdakIndex.module.css';
import axios from 'axios';

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

const KospiKosdakIndex : React.FC = () => {
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
          import.meta.env.VITE_DATA_API_URL + '/price/KSQSTK'
          );
        const data = response.data;
        setIndexData(data);
        // console.log(data);
      } catch (error) {
        console.error('에러', error);
      }
    };

    getMarketData();
  }, []);

  return (
      <div className={styles.mainContainer}>
        <div className={styles.indexContainer}>
          <div className={styles.indexTitle}>코스피</div>
          <div className={styles.indexContent}>
            {/* <p>기준일자: {indexData.KOSPI.base_date}</p> */}
            {/* 현재 지수 */}
            <div>{indexData.KOSPI.price}</div>
            {/* 변화 지수 */}
            <div className={styles.number}>{indexData.KOSPI.price_change}</div>
            {/* 등락률 */}
            {/* <p>{indexData.KOSPI.percentage_change}%</p> */}
          </div>
        </div>
        <div className={styles.indexContainer}>
          <div className={styles.indexTitle}>코스닥</div>
          <div className={styles.indexContent}>
            {/* <p>기준일자: {indexData.KOSDAQ.base_date}</p> */}
            {/* 현재 지수 */}
            <div>{indexData.KOSDAQ.price}</div>
            {/* 변화 지수 */}
            <div className={styles.number}>{indexData.KOSDAQ.price_change}</div>
            {/* 등락률 */}
            {/* <p>{indexData.KOSDAQ.percentage_change}%</p> */}
          </div>
        </div>
      </div>
  );
};

export default KospiKosdakIndex;
