import styles from './BasicInfo.module.css'

const BasicInfo : React.FC<TradingRecord>= ({
  corpName,
  tradeAt,
  logoUrl,
  optionBuySell,
  price,
  cnt
}) => {
  return ( 
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
   );
}
 
export default BasicInfo;