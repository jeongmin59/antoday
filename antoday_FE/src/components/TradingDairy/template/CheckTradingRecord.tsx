import React from 'react';
import styles from './CheckTradingRecord.module.css'

// 타입 정의하기


const CheckTradingRecord: React.FC = () => {

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
