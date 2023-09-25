import React from "react";
import styles from "./CheckTradingRecord.module.css";
import HomeKeyWords from "../../WordCloud/module/HomeKeyWords";
import InputForm from "./InputForm";

const CheckTradingRecord: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  corpName,
  tradePk,
}) => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.title}>거래 주식</div>
        <div className={styles.subContainer}>
          <div className={styles.tradeAt}>{tradeAt}</div>
          <div className={styles.contentContainer}>
            <div className={styles.leftContainer}>
              <img className={styles.corpimage} src={logoUrl} alt="" />
              <div>{corpName}</div>
              {optionBuySell ? <div>매수</div> : <div>매도</div>}
            </div>
            <div className={styles.rightContainer}>
              <div>{price}</div>
              <div>{cnt}주</div>
            </div>
          </div>
        </div>
      </div>

      <HomeKeyWords />
      <InputForm
        tradeAt={tradeAt}
        stockCode={stockCode}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        tradePk={tradePk}
      />
    </div>
  );
};

export default CheckTradingRecord;
