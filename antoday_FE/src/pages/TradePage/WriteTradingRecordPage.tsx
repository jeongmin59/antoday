import React from 'react';
// import { useLocation } from 'react-router';
import styles from './WriteTradingRecordPage.module.css'
import CheckTradingRecord from '../../components/TradingDairy/template/CheckTradingRecord';


const WriteTradingRecordPage = () => {
  // 여기에 글 작성 로직
  // const location = useLocation();
  // const tradingdata = location.state?.tradingdata;

  return (
    <React.Fragment>
      <CheckTradingRecord />
      {/* <p>{tradingdata}</p> */}

      {/* <button>닫기</button> */}
    </React.Fragment>
  );
};

export default WriteTradingRecordPage;
