import React from "react";
import styles from "./StockInfoSummary.module.css";
import { addCommas } from "../../../utils/addCommas";

const StockInfoSummary: React.FC<stockIntro> = ({ lowValue, highValue }) => {
  const lowValues = lowValue ? addCommas(lowValue) : "";
  const highValues = highValue ? addCommas(highValue) : "";
  
  return (
  <div className={styles.mainContainer}>
    <div className={styles.lowContent}>최고 | {lowValues}</div>
    <div className={styles.highContent}>최저 | {highValues}</div>
   </div>
  );
};

export default StockInfoSummary;
