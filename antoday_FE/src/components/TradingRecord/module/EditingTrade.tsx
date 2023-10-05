import styles from "./EditingTrade.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import EditingReasonKeyword from "./EditingReasonKeyword";

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
            selected={editedTradeAt}
            onChange={handleTradeAtChange}
            dateFormat="yyyy-MM-dd"
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
              <div className={styles.corpName}>{editedCorpName}</div>
              <select
                value={editedOptionBuySell}
                onChange={handleOptionBuySellChange}
              >
                <option value="0">매도</option>
                <option value="1">매수</option>
              </select>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.horizontal}>
              <input
                type="number"
                value={editedPrice}
                onChange={handlePriceChange}
                className={styles.inputprice}
              />
              <div>원</div>
            </div>
            <div className={styles.horizontal}>
              <input
                type="number"
                value={editedCnt}
                onChange={handleCntChange}
                className={styles.count}
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
