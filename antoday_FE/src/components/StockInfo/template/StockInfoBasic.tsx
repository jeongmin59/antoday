import React from "react";
import styles from "./StockInfoBasic.module.css";
import FavoriteCompanyButton from "../atoms/FavoriteCompanyButton";

interface StockInfoBasicProps {
  stockPk: number;
}

const StockInfoBasic: React.FC = ({ stockPk }) => {
  return (
    <div className={styles.stockInfoBasicContainer}>
      <div className={styles.LeftContainer}>
        <div className={styles.stockCode}>{stockPk}</div>
        <div className={styles.stockNameContainer}>
          삼성전자
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
