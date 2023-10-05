import styles from "./BasicInfo.module.css";
import {useState, useEffect} from 'react';

const BasicInfo: React.FC<TradingRecord> = ({
  corpName,
  tradeAt,
  logoUrl,
  optionBuySell,
  price,
  cnt,
}) => {

  
  const [convertedDate, SetConvertedDate] = useState<string | null>(null);
  
  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
}
  
useEffect(() => {
  if (tradeAt) {
    const formatted = formatDate(tradeAt);
    SetConvertedDate(formatted);  
  }
}, [tradeAt]);  


  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.tradeAt} ${styles.h2}`}>{convertedDate}</div>
      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          <img className={styles.corpimage} src={logoUrl} alt="" />
          <div className={styles.subContainer}>
            <div className={styles.h3}>{corpName}</div>
            {optionBuySell ? (
              <div className={`${styles.optionBuySell} ${styles.h3}`}>매수</div>
            ) : (
              <div className={`${styles.optionBuySell} ${styles.h3}`}>매도</div>
            )}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.h3}>{price}원</div>
          <div className={styles.h3}>{cnt}주</div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
