import React from "react";
import styles from "./StockInfoSummary.module.css";
import { addCommas } from "../../../utils/addCommas";

const StockInfoSummary: React.FC<stockIntro> = ({ lowValue, highValue }) => {
  const lowValues = lowValue ? addCommas(lowValue) : "";
  const highValues = highValue ? addCommas(highValue) : "";
  
  return (
  <div className={styles.mainContainer}>
    <div className={styles.contentContainer}>
      <div className={styles.highContent}>최고 {highValues}</div>
      <div className={styles.lowContent}>최저 {lowValues}</div>
    </div>
    <div className={styles.standard}>(52주 기준)</div>
   </div>
  );
};

export default StockInfoSummary;
