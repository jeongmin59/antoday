import BasicInfo from "../module/BasicInfo";
import ReasonKeywords from "../module/ReasonKeywords";
import ReasonTexts from "../module/ReasonTexts";
import styles from "./ReadingTrade.module.css";

const ReadingTrade: React.FC<TradingRecord> = ({
  corpName,
  tradeAt,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  keywordList,
  reason,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.buttonContainer}>
          <div className={styles.title}>매매일지</div>
        </div>
        <BasicInfo
          corpName={corpName}
          tradeAt={tradeAt}
          logoUrl={logoUrl}
          optionBuySell={optionBuySell}
          price={price}
          cnt={cnt}
        />
      </div>
      <ReasonKeywords keywordList={keywordList} />
      <ReasonTexts reason={reason} />
    </div>
  );
};

export default ReadingTrade;
