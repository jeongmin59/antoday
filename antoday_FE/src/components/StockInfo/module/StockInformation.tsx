import React, { useState } from "react";
import styles from "./StockInformation.module.css";
import InfoCardComponent from "../atom/InfoCardComponent";

const StockInformation: React.FC = () => {
  const [titleText, setTitle] = useState<string>("BFS");
  const [contentText, setContent] = useState<number>(23230);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>종목정보</div>
      <div className={styles.StockInfoContainer}>
        <InfoCardComponent title={titleText} number={contentText} />
        <InfoCardComponent title={titleText} number={contentText} />
        <InfoCardComponent title={titleText} number={contentText} />
        <InfoCardComponent title={titleText} number={contentText} />
        <InfoCardComponent title={titleText} number={contentText} />
        <InfoCardComponent title={titleText} number={contentText} />
      </div>
    </div>
  );
};

export default StockInformation;
