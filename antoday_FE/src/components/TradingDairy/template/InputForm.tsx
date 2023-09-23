import React from 'react';
// import { useLocation } from 'react-router';
// import styles from './WriteTradingRecordPage.module.css'
import KeywordInput from '../modules/KeywordInput';

const InputForm :React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
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
      />
    </div>
  );
};

export default InputForm;
