import React from 'react';
// import { useLocation } from 'react-router';
import styles from './WriteTradingRecordPage.module.css'
import CheckTradingRecord from '../../components/TradingDairy/template/CheckTradingRecord';
import HomeKeyWords from '../../components/WordCloud/module/HomeKeyWords'
import InputConfirm from '../../components/TradingDairy/template/InputConfirm';

const WriteTradingRecordPage = () => {
  // 여기에 글 작성 로직
  // const location = useLocation();
  // const tradingdata = location.state?.tradingdata;

  return (
    <React.Fragment>
      <CheckTradingRecord />
      {/* 워드클라우드 완성 시에 갈아끼우기 */}
      <HomeKeyWords/>
      <InputConfirm />
    </React.Fragment>
  );
};

export default WriteTradingRecordPage;
