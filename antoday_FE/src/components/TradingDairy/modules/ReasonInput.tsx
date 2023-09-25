import React, { useState, ChangeEvent } from "react";
import styles from "../template/CheckTradingRecord.module.css";
import SaveBtn from "../atoms/SaveBtn";
import SkipBtn from "../atoms/SkipBtn";

const ReasonInput: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  keywordList,
  tradePk,
}) => {
  const [reason, setReason] = useState<string>("");

  const handleRecordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };
  //
  return (
    <React.Fragment>
      <div className={styles.pageTitle}>매수/매도 이유 (선택)</div>
      <div className={styles.recordContainer}>
        <textarea
          value={reason}
          onChange={handleRecordChange}
          placeholder="이유를 입력해주세요."
          rows={5} // 행 수
          cols={40} // 열 수
          style={{ border: "none", height: "80%", width: "90%" }}
        />
      </div>
      <SkipBtn />
      <SaveBtn
        tradeAt={tradeAt}
        stockCode={stockCode}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        keywordList={keywordList}
        reason={reason}
        tradePk={tradePk}
      />
    </React.Fragment>
  );
};

export default ReasonInput;
