import React from 'react';
import styles from './CheckTradingRecord.module.css'

// 타입 정의하기
interface CheckTradingRecordProps {
  tradeAt: string;
  corpName: string;
  logoUrl: string;
  optionBuySell: string;
  price: number;
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

  return (
    <div className={styles.mainContainer}>

      <div className={styles.title}>거래 주식</div>
      <div className={styles.subContainer}>
        <div className={styles.tradeAt}>
          {tradeAt}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <img className={styles.corpimage} src={logoUrl} alt='' />
            <div>{corpName}</div>
            {optionBuySell? (<div>매수</div>):(<div>매도</div>)}
          </div>
          <div className={styles.rightContainer}>
            <div>{price}</div>
            <div>{cnt}주</div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default CheckTradingRecord;
