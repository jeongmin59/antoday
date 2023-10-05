import styles from "./EditingTrade.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditingReasonKeyword from "./EditingReasonKeyword";
import { excludedDates } from "../../../utils/excludedDates";
import { ko } from "date-fns/esm/locale";

const EditingTrade: React.FC<TradingRecord> = ({
  corpName,
  tradeAt,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  keywordList,
  reason,
  stockCode,
  tradePk,
}) => {
  const [editedTradeAt, setEditedTradeAt] = useState(new Date(tradeAt));
  const [editedCorpName, setEditedCorpName] = useState(corpName);
  const [editedOptionBuySell, setEditedOptionBuySell] = useState(optionBuySell);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCnt, setEditedCnt] = useState(cnt);
  const adjustInitialDate = (date: Date): Date => {
    let adjusted = new Date(date);
    if (
      adjusted.getDay() !== 0 &&
      adjusted.getDay() !== 6 &&
      date.getHours() < 9
      ) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      while (adjusted.getDay() === 0 || adjusted.getDay() === 6) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      
      return adjusted;
    };
    const initialAdjustedDate = adjustInitialDate(new Date());
    
    const handleTradeAtChange = (date: Date) => {
      setEditedTradeAt(date);
  };

  const handleCorpNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCorpName(event.target.value);
  };

  const handleOptionBuySellChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditedOptionBuySell(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(event.target.value);
  };

  const handleCntChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCnt(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.tradeAt}>
          <DatePicker
            locale={ko}
            dateFormat="yyyy.MM.dd"
            selected={editedTradeAt}
            maxDate={initialAdjustedDate}
            onChange={handleTradeAtChange}
            filterDate={(date: Date) => {
              // 주말 제외
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;

              // 휴일 제외
              const isHoliday = excludedDates.some(
                (hDate) =>
                  hDate.getFullYear() === date.getFullYear() &&
                  hDate.getMonth() === date.getMonth() &&
                  hDate.getDate() === date.getDate()
              );

              return !isWeekend && !isHoliday;  // 주말도 아니고 휴일도 아닌 경우만 true 반환
            }}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <img className={styles.corpimage} src={logoUrl} alt="" />
            <div className={styles.subContainer}>
              {/* <input
              type="text"
              value={editedCorpName}
              onChange={handleCorpNameChange}
            /> */}
              <div className={styles.h2}>{editedCorpName}</div>
              <select
                value={editedOptionBuySell}
                onChange={handleOptionBuySellChange}
                className={styles.h2}
              >
                <option value="1">매도</option>
                <option value="0">매수</option>
              </select>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.horizontal}>
              <input
                type="number"
                value={editedPrice}
                onChange={handlePriceChange}
                className={`${styles.inputprice} ${styles.h2}`}
              />
              <div>원</div>
            </div>
            <div className={styles.horizontal}>
              <input
                type="number"
                value={editedCnt}
                onChange={handleCntChange}
                className={`${styles.count} ${styles.h2}`}
              />
              <div>주</div>
            </div>
          </div>
        </div>
      </div>
      <EditingReasonKeyword
        editedTradeAt={editedTradeAt}
        editedCorpName={editedCorpName}
        editedOptionBuySell={editedOptionBuySell}
        editedPrice={editedPrice}
        editedCnt={editedCnt}
        keywordList={keywordList}
        reason={reason}
        stockCode={stockCode}
        tradePk={tradePk}
      />
    </div>
  );
};

export default EditingTrade;
