import React, { useState } from "react";
import styles from "./CompanyOverview.module.css";

interface BusinessDescription {
  electronicsManufacturing: string;
  displayManufacturing: string;
  biopharmaceuticalsAndMedicalDevices: string;
}

const CompanyOverview: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("삼성전자");
  const [establishedDate, setEstablishedDate] = useState<string>("2020-01-01");
  const [existencePeriod, setExistencePeriod] = useState<string>("10년 이상");
  const [kospiKosdaq, setKospiKosdaq] = useState<string>("코스피");
  const [smallVenture, setSmallVenture] = useState<string>("중소기업");
  const businessDescription: BusinessDescription = {
    electronicsManufacturing: "스마트폰, TV 및 가전제품 제조",
    displayManufacturing: "AMOLED 및 LCD 디스플레이 제조",
    biopharmaceuticalsAndMedicalDevices:
      "의약품 및 바이오의약품, 의료 기기 개발 및 생산",
  };

  return (
    <div className={styles.companyInfoContainer}>
      <div>기업 개요</div>
      <ul className={styles.companyInfoContentContainer}>
        <li>
          <strong className={styles.strongText}>기업명:</strong> {companyName}
        </li>
        <li>
          <strong className={styles.strongText}>설립일자:</strong>{" "}
          {establishedDate}
        </li>
        <li>
          <strong className={styles.strongText}>존속기간:</strong>{" "}
          {existencePeriod}
        </li>
        <li>
          <strong className={styles.strongText}>코스피/코스닥 여부:</strong>{" "}
          {kospiKosdaq}
        </li>
        <li>
          <strong className={styles.strongText}>중소/벤처 기업 여부:</strong>{" "}
          {smallVenture}
        </li>
        <li>
          <strong className={styles.strongText}>주요사업 내용:</strong>
          <div>{businessDescription.biopharmaceuticalsAndMedicalDevices}</div>
          <div>{businessDescription.displayManufacturing}</div>
          <div>{businessDescription.electronicsManufacturing}</div>
        </li>
      </ul>
    </div>
  );
};

export default CompanyOverview;
