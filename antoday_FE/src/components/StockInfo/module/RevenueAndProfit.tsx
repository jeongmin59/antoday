import React from "react";
import styles from "./RevenueAndProfit.module.css";

const RevenueAndProfit: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>매출액 및 영업이익</div>
      <div className={styles.graph}>여기에 차트가 들어갈거</div>
    </div>
  );
};

export default RevenueAndProfit;
