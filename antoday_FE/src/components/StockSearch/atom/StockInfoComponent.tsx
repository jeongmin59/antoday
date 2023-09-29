import React from "react";
import styles from "./StockInfoComponent.module.css";
import { useNavigate } from "react-router-dom";

interface StockInfoComponentProps {
  companyInfo: CompanyInfo; // 기업 정보를 받을 prop
  isLoading: boolean;
}

const StockInfoComponent: React.FC<StockInfoComponentProps> = ({
  companyInfo,
}) => {
  const navigator = useNavigate();

  const handleClick = () => {
    const stockCode = companyInfo.stockCode;
    // navigator(`/stockinfo/${stockCode}`);
    window.location.href = `/stockinfo/${stockCode}`;  //새로고침
  };

  return (
    <div className={styles.stockSearchResult} onClick={handleClick}>
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
