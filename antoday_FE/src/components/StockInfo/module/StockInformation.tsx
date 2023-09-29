import React, { useState } from "react";
import styles from "./StockInformation.module.css";
import InfoCardComponent from "../atom/InfoCardComponent";

interface StockInformationProps {
  corpInfo: string[];
}

const StockInformation: React.FC<StockInformationProps> = ({ corpInfo }) => {
  const BPS = corpInfo?.BPS;
  const EPS = corpInfo?.EPS;
  const PBR = corpInfo?.PBR;
  const PER = corpInfo?.PER;
  const ROA = corpInfo?.ROA;
  const ROE = corpInfo?.ROE;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>종목정보</div>
      <div className={styles.StockInfoContainer}>
        <InfoCardComponent title={"BPS"} number={BPS} />
        <InfoCardComponent title={"EPS"} number={EPS} />
        <InfoCardComponent title={"PBR"} number={PBR} />
        <InfoCardComponent title={"PER"} number={PER} />
        <InfoCardComponent title={"ROA"} number={ROA} />
        <InfoCardComponent title={"ROE"} number={ROE} />
      </div>
    </div>
  );
};

export default StockInformation;
