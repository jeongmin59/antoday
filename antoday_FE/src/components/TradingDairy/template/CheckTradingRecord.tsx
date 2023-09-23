import React from 'react';
import styles from './CheckTradingRecord.module.css'

// 타입 정의하기
interface CheckTradingRecordProps {
  tradeAt: string; // 예를 들어 문자열로 정의
  corpName: string;
  logoUrl: string;
  optionBuySell: string;
  price: number; // 숫자로 정의
  cnt: number;
}


const CheckTradingRecord: React.FC<CheckTradingRecordProps> = ({
  tradeAt,
  corpName,
  logoUrl,
  optionBuySell,
  price,
  cnt,
}) => {

  console.log('잘넘어오나?',
  tradeAt,
  corpName,
  logoUrl,
  optionBuySell,
  price,
  cnt,)
  return (
    <React.Fragment>
      <div className={styles.pageTitle}>거래 주식</div>
      <div className={styles.recordContainer}>
        매매 기록 넣을 공간
      </div>

    </React.Fragment>
  );
};

export default CheckTradingRecord;
