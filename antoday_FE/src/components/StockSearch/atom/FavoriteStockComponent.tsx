import React from "react";
import styles from "./FavoriteStockComponent.module.css";
import { useNavigate } from "react-router-dom";
import FavoriteCompanyButton from "../../StockInfo/atom/FavoriteCompanyButton";

interface StockInfoComponentProps {
  companyInfo: CompanyInfo; // 기업 정보를 받을 prop
  //   isLoading: boolean;
}

const FavoriteStockComponent: React.FC<StockInfoComponentProps> = ({
  companyInfo,
}) => {
  const navigator = useNavigate();

  const handleClick = () => {
    const stockCode = companyInfo.stockCode;
    navigator(`/stockinfo/${stockCode}`);
  };
  return (
    <div className={styles.stockSearchResult} onClick={handleClick}>
      {companyInfo ? (
        <React.Fragment>
          <div className={styles.leftContainer}>
            <img
              className={styles.stockImage}
              src={companyInfo.logoUrl}
              alt="기업이미지"
            />
            <p className={styles.stockName}>{companyInfo.corpName}</p>
          </div>
          <FavoriteCompanyButton
            stockPk={companyInfo.stockCode}
            isLiked={companyInfo.isLiked}
          />
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

export default FavoriteStockComponent;
