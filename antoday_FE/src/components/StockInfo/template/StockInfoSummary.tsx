import React from "react";
import styles from "./StockInfoSummary.module.css";

const StockInfoSummary: React.FC<stockIntro> = ({
  lowValue,
  highValue
}) => {
  
  return (<div className={styles.mainContainer}>
    <div className={styles.content}>최고:{lowValue}</div>
    <div className={styles.content}>최저:{highValue}</div>
    </div>);
};

export default StockInfoSummary;
