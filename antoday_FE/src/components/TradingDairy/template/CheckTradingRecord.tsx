import React from "react";
import styles from "./CheckTradingRecord.module.css";
import HomeKeyWords from "../../WordCloud/module/HomeKeyWords";
import InputForm from "./InputForm";
import { convertDate } from "../../../utils/convertDate";

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
  const resultDate = convertDate(tradeAt);

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>거래 주식</div>
          <div className={styles.subContainer}>
            <div className={styles.tradeAt}>{resultDate}</div>
            <div className={styles.contentContainer}>
              <div className={styles.leftContainer}>
                <img className={styles.corpimage} src={logoUrl} alt="" />
                <div className={styles.column}>
                  <div className={styles.h3}>{corpName}</div>
                  {optionBuySell ? <div className={styles.h3}>매도</div> : <div className={styles.h3}>매수</div>}
                </div>
              </div>
            <div className={`${styles.rightContainer} ${styles.column}`}>
              <div className={styles.h3}>{price}원</div>
              <div className={styles.h3}>{cnt}주</div>
            </div>
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
