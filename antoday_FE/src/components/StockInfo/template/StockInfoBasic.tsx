import React, { useState } from "react";
import styles from "./StockInfoBasic.module.css";
import FavoriteCompanyButton from "../atom/FavoriteCompanyButton";

interface StockInfoBasicProps {
  stockPk?: string;
}

const StockInfoBasic: React.FC<StockInfoBasicProps> = ({ stockPk }) => {
  const [corpName, setCorpName] = useState<string>("삼성전자");
  const [isKospi, setIsKospi] = useState<boolean>(true);
  const [isKosdak, setIsKosdak] = useState<boolean>(false);

  return (
    <div className={styles.stockInfoBasicContainer}>
      <div className={styles.LeftContainer}>
        <div className={styles.stockCode}>{stockPk}</div>
        <div className={styles.stockNameContainer}>
          {corpName}
          {isKospi && (
            <span
              style={{
                fontSize: "var(--font-h6)",
                color: "white",
                backgroundColor: "var(--main-blue-color)",
                borderRadius: "5px",
                padding: "0.8px",
              }}
            >
              코스피
            </span>
          )}
          {isKosdak && (
            <span
              style={{
                fontSize: "var(--font-h6)",
                color: "white",
                backgroundColor: "var(--main-blue-color)",
                borderRadius: "5PX",
                padding: "0.8px",
              }}
            >
              코스닥
            </span>
          )}
        </div>
        <div className={styles.stocPrice}>
          202332원
          <span style={{ fontSize: "var(--font-h6)", color: "red" }}>
            어제보다+9090원
          </span>
        </div>
      </div>
      <div className={styles.RightContainer}>
        <FavoriteCompanyButton stockPk={stockPk} />
        <div className={styles.tradeRecord}>매매기록</div>
      </div>
    </div>
  );
};

export default StockInfoBasic;
