import React from "react";
import styles from "./CompanyOverview.module.css";

interface CompanyOverviewProps {
  corpIntro: stockIntro;
  corpOverview?: any;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  corpOverview,
  corpIntro,
}) => {
  console.log("뭘까", corpOverview);
  console.log("뭘까", corpIntro);
  const companyName = corpIntro?.corp_name;
  const establishedDate =
    corpOverview && corpOverview.length > 3 ? corpOverview[3]?.설립일 : null;
  const staffNumber =
    corpOverview && corpOverview.length > 6 ? corpOverview[6]?.종업원수 : null;
  const kospiKosdaq = corpIntro?.market;
  const homePage = corpOverview[1]?.홈페이지;

  return (
    <div className={styles.companyInfoContainer}>
      <div className={styles.companyInfoTitle}>기업 개요</div>
      <ul className={styles.companyInfoContentContainer}>
        <li>
          <strong className={styles.strongText}>기업명</strong> {companyName}
        </li>
        <li>
          <strong className={styles.strongText}>설립일자</strong>{" "}
          {establishedDate}
        </li>
        <li>
          <strong className={styles.strongText}>종업원 수</strong> {staffNumber}
        </li>
        <li>
          <strong className={styles.strongText}>코스피/코스닥 여부</strong>{" "}
          {kospiKosdaq}
        </li>
        <li>
          <strong className={styles.strongText}>홈페이지 주소</strong>{" "}
          {homePage}
        </li>
      </ul>
    </div>
  );
};

export default CompanyOverview;
