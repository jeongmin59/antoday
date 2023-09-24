import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import styles from './ProfitRate.module.css';
import { useRecoilState } from 'recoil';
import { accessTokenAtom } from '../../../recoil/auth';

interface ProfitRateProps {
  stockCode: string;
}

const ProfitRate: FC<ProfitRateProps> = ({ stockCode }) => {
  const [rate, setRate] = useState<number | null>(null);
  const [token] = useRecoilState(accessTokenAtom);

  useEffect(() => {
    const fetchROI = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/trade/roi`, {
          params: {
            stock_code: stockCode,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data && data.avgRoi) {
          setRate(data.avgRoi);
        }
      } catch (error) {
        console.error("Error fetching ROI:", error);
      }
    };

    fetchROI();
  }, [stockCode, token]);

  if (rate === null) return null;
  
  return (
    <div className={styles.profitRateContainer}>
      <h5>수익률: {rate}%</h5>
    </div>
  );
};

export default ProfitRate;
