// import {Link} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import styles from "./TradeFilter.module.css";
import SearchingDate from "../../../components/TradingRecord/template/SearchingDate";

interface TradeFilterProps {
  handleSearchDate: (start: string, end: string) => void;
  handleFilterOption: (option: string) => void;
  handleOrder: (option: string) => void;
}

const TradeFilter: React.FC<TradeFilterProps> = ({
  handleSearchDate,
  handleFilterOption,
  handleOrder,
}) => {
  const [filter1, setFilter1] = useState<number>(0);
  const [filter2, setFilter2] = useState<number>(1);

  const filtering1 = (option: number) => {
    if (filter1 == option) {
      setFilter1(0);
      handleFilterOption("");
    } else {
      setFilter1(option);
      if (option == 1) handleFilterOption("BUY");
      else if (option == 2) handleFilterOption("SELL");
      else if (option == 3) handleFilterOption("UNWRITTEN");
    }
  };

  const filtering2 = (option: number) => {
    if (filter2 != option) {
      setFilter2(option);
      if (option == 1) handleOrder("LATEST");
      else if (option == 2) handleOrder("OLDEST");
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.container}>
        <div className={styles.tag}>필터</div>
        <div className={styles.row}>
          <button
            className={filter1 === 1 ? styles.selected : styles.nonselected}
            onClick={() => filtering1(1)}
          >
            <span>매수기록</span>
          </button>
          <button
            className={filter1 === 2 ? styles.selected : styles.nonselected}
            onClick={() => filtering1(2)}
          >
            <span>매도기록</span>
          </button>
          <button
            className={filter1 === 3 ? styles.selected : styles.nonselected}
            onClick={() => filtering1(3)}
          >
            <span>매매이유 미작성 기록</span>
          </button>
        </div>
        <div className={styles.tag}>기간</div>
        <div className={styles.row}>
          <SearchingDate onSearch={handleSearchDate} />
        </div>
        <div className={styles.tag}>정렬</div>
        <div className={styles.row}>
          <button
            className={filter2 == 1 ? styles.selected : styles.nonselected}
            onClick={() => filtering2(1)}
          >
            <span>최신순</span>
          </button>
          <button
            className={filter2 == 2 ? styles.selected : styles.nonselected}
            onClick={() => filtering2(2)}
          >
            <span>오래된순</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeFilter;
