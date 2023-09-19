import React from "react";
import styles from "./StockInfoComponent.module.css";

interface StockSearchResultProps {
  companyInfo: CompanyInfo; // 기업 정보를 받을 prop
}

const StockInfoComponent: React.FC<StockSearchResultProps> = ({
  companyInfo,
}) => {
  return (
    <div className={styles.stockSearchResult}>
      {companyInfo ? (
        <React.Fragment>
          <img
            className={styles.stockImage}
            src={companyInfo.logoUrl}
            alt="기업이미지"
          />
          <p>{companyInfo.corpName}</p>
        </React.Fragment>
      ) : (
        // 스켈레톤 코드를 표시
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonText}></div>
        </div>
      )}
    </div>
  );
};

export default StockInfoComponent;
