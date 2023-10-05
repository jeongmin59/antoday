import React from "react";
import styles from "./StockWordCloud.module.css";
import CustomBubbleChart from "../../WordCloud/template/CustomBubbleChart";
const StockWordCloud: React.FC = () => {
  return (
    <div className={styles.stockWordsContainer}>
      <div className={styles.title}>종목 워드클라우드</div>
      <CustomBubbleChart />
    </div>
  );
};

export default StockWordCloud;
