import React from "react";
// import { useLocation } from 'react-router';
import styles from "./WriteKeywordAndReasonPage.module.css";
import CheckTradingRecord from "../../components/TradingDairy/template/CheckTradingRecord";
// import HomeKeyWords from '../../components/WordCloud/module/HomeKeyWords'
// import InputConfirm from '../../components/TradingDairy/template/InputConfirm';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Common/atom/LoadingSpinner";

const WriteKeywordAndReasonPage: React.FC = () => {
  // 여기에 글 작성 로직
  const { tradePk } = useParams();

  // 매매기록 디테일 받아오기
  const {
    data: tradeResults,
    isLoading,
    // isError,
  } = useQuery("tradeResults", async () => {
    if (!tradePk) {
      // tradePk가 nul인 경우 요청 보내지 않기
      return;
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`
      );
      console.log("axios 요청 성공", response.data);
      return response.data;
    } catch (error) {
      console.error("axios 요청 실패", error);
      throw error;
    }
  });

  const tradeAt = tradeResults?.tradeAt;
  const stockCode = tradeResults?.stockCode;
  const corpName = tradeResults?.corpName;
  const logoUrl = tradeResults?.logoUrl;
  const optionBuySell = tradeResults?.optionBuySell;
  const price = tradeResults?.price;
  const cnt = tradeResults?.cnt;

  return (
    <div>
      {isLoading ? (
        // <SkeletonComponent />
        <LoadingSpinner />
      ) : (
        <div className={styles.mainContainer}>
          <CheckTradingRecord
            tradeAt={tradeAt}
            stockCode={stockCode}
            logoUrl={logoUrl}
            optionBuySell={optionBuySell}
            price={price}
            cnt={cnt}
            corpName={corpName}
            tradePk={tradePk}
          />
        </div>
      )}
    </div>
  );
};

export default WriteKeywordAndReasonPage;
