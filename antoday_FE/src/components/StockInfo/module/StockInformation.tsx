import React, { useState } from "react";
import styles from "./StockInformation.module.css";
import InfoCardComponent from "../atom/InfoCardComponent";

interface StockInformationProps {
  corpInfo: string[];
}

const StockInformation: React.FC<StockInformationProps> = ({ corpInfo }) => {
  console.log("종목정보 컴포넌트에서", corpInfo);
  const [titleText, setTitle] = useState<string>("");
  const [contentText, setContent] = useState<number>(0);

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
