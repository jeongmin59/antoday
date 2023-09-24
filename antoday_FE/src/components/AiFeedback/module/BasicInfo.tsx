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
    <div className={styles.mainContainer}>
        <div className={styles.tradeAt}>
          {tradeAt}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <img className={styles.corpimage} src={logoUrl} alt='' />
            <div className={styles.subContainer}>
              <div>{corpName}</div>
              {optionBuySell? (<div className={styles.optionBuySell}>매수</div>):(<div className={styles.optionBuySell}>매도</div>)}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div>{price}원</div>
            <div>{cnt}주</div>
          </div>
        </div>
      </div>
   );
}
 
export default BasicInfo;