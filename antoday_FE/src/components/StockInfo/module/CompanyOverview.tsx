import React, { useState } from "react";
import styles from "./CompanyOverview.module.css";

interface CompanyOverviewProps {
  corpIntro: stockIntro;
  corpOverview? : any;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({corpOverview,corpIntro}) => {
  
  // const companyName = corpIntro?.corp_name;
  // const establishedDate = corpOverview[3]?.설립일;
  // const staffNumber = corpOverview[6]?.종업원수;
  // const kospiKosdaq = corpIntro?.market;
  // const homePage = corpOverview[1]?.홈페이지;

  return (
    <div className={styles.companyInfoContainer}>
      {/* <div>기업 개요</div>
      <ul className={styles.companyInfoContentContainer}>
        <li>
          <strong className={styles.strongText}>기업명:</strong> {companyName}
        </li>
        <li>
          <strong className={styles.strongText}>설립일자:</strong>{" "}
          {establishedDate}
        </li>
        <li>
          <strong className={styles.strongText}>종업원수:</strong>{" "}
          {staffNumber}
        </li>
        <li>
          <strong className={styles.strongText}>코스피/코스닥 여부:</strong>{" "}
          {kospiKosdaq}
        </li>
        <li>
          <strong className={styles.strongText}>홈페이지주소:</strong>{" "}
          {homePage}
        </li>
        <li>
          <strong className={styles.strongText}>주요사업 내용:</strong>
          <div>{businessDescription.biopharmaceuticalsAndMedicalDevices}</div>
          <div>{businessDescription.displayManufacturing}</div>
          <div>{businessDescription.electronicsManufacturing}</div>
        </li>
      </ul> */}
    </div>
  );
};

export default CompanyOverview;
