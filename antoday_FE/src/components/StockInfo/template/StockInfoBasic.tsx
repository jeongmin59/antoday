import React, { useState } from "react";
import styles from "./StockInfoBasic.module.css";
import FavoriteCompanyButton from "../atom/FavoriteCompanyButton";

interface StockInfoBasicProps {
  corpIntro?: stockIntro;
}

const StockInfoBasic: React.FC<StockInfoBasicProps> = ({ corpIntro }) => {
  
  const corpName = corpIntro?.corp_name;
  const price = corpIntro?.index;
  const stockCode = corpIntro?.stock_code;
  const change = corpIntro?.change;
  const market = corpIntro?.market;

  return (
    <div className={styles.stockInfoBasicContainer}>
      <div className={styles.LeftContainer}>
        <div className={styles.stockCode}>{stockCode}</div>
        <div className={styles.stockNameContainer}>
          {corpName}
          <span
            style={{
              fontSize: "var(--font-h2)",
              color: "white",
              backgroundColor: "var(--main-blue-color)",
              borderRadius: "5px",
              padding: "0.8px",
            }}
          >
            {market}
          </span>
        </div>
        <div className={styles.stocPrice}>
          {price}원
          <span style={{ fontSize: "var(--font-h2)", color: "red" }}>
            어제보다{change}원
          </span>
        </div>
      </div>
      <div className={styles.RightContainer}>
        {/* <FavoriteCompanyButton stockPk={stockPk} /> */}
        <div className={styles.tradeRecord}>매매기록</div>
      </div>
    </div>
  );
};

export default StockInfoBasic;
