import React, { useState, useEffect, FC } from "react";
import { StockRoiType } from "../../../pages/TradePage/TradingRecordPage";
import styles from "./StockProfit.module.css";
import { useNavigate } from "react-router-dom";

interface ProfitRateProps {
  info: StockRoiType;
  onClose: React.MouseEventHandler;
}

const ProfitRate: FC<ProfitRateProps> = ({ info, onClose }) => {
  const navigator = useNavigate();
  const handleInfo = () => {
    navigator(`/stockinfo/${info.stockCode}`);
  };

  const plusnumber = (num: number) => {
    if (num > 0) {
      return "+" + num;
    }
    return num;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.modalHeader}>
          <div>{info.corpName}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <div className={styles.name}>보유량</div>
            <div>{info.cnt}개</div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>평단가</div>
            <div>{info.avgPrice}원</div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.name}>수익률</div>
          {info.profit >= 0 ? (
            <div className={styles.optionPlus}>
              +{info.profit}원 ({info.roi}%)
            </div>
          ) : (
            <div className={styles.optionMinus}>
              {info.profit}원 ({info.roi}%)
            </div>
          )}
        </div>
        <button className={styles.movebtn} onClick={() => handleInfo()}>
          기업 정보 바로가기
        </button>
      </div>
    </div>
  );
};

export default ProfitRate;
