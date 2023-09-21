import React from "react";
import styles from "./StockWordCloud.module.css";
import HomeKeyWords from "../../WordCloud/module/HomeKeyWords";

const StockWordCloud: React.FC = () => {
  return (
    <div className={styles.stockWordsContainer}>
      <div className={styles.title}>종목 워드클라우드</div>
      <HomeKeyWords />
    </div>
  );
};

export default StockWordCloud;
