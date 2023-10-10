import React from "react";
import KeywordInput from "../modules/KeywordInput";

const InputForm: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  tradePk,
}) => {
  return (
    <div>
      <KeywordInput
        tradeAt={tradeAt}
        stockCode={stockCode}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        tradePk={tradePk}
      />
    </div>
  );
};

export default InputForm;
