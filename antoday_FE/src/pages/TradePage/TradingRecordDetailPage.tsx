import AiFeedback from "../../components/AiFeedback/template/AiFeedback";
import ReadingTrade from "../../components/AiFeedback/template/ReadingTrade";
import styles from "./TradingRecordDetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TradingRecordDetailPage = () => {
  const { tradePk } = useParams();

  const {
    data: tradeResults,
    isLoading,
    // isError,
  } = useQuery("tradeResults", async () => {
    if (!tradePk) {
      // tradePk가 null인 경우 요청 보내지 않기
      return;
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`
      );
      
      return response.data;
    } catch (error) {
      console.error("매매 기록 불러오는 axios 요청 실패", error);
    }
  });

  const tradeAt = tradeResults?.tradeAt;
  const reason = tradeResults?.reason;
  const keyword = tradeResults?.keyword;
  const corpName = tradeResults?.corpName;
  const logoUrl = tradeResults?.logoUrl;
  const optionBuySell = tradeResults?.optionBuySell;
  const price = tradeResults?.price;
  const cnt = tradeResults?.cnt;
  const aiAnalyze = tradeResults?.aiAnalyze;
  const stockCode = tradeResults?.stockCode;

  console.log('결과는?',aiAnalyze)

  if (isLoading) {
    return (
      <div className={styles.stockInfoPageContainer}>
        <Skeleton />
    </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <ReadingTrade
          corpName={corpName}
          tradeAt={tradeAt}
          logoUrl={logoUrl}
          optionBuySell={optionBuySell}
          price={price}
          cnt={cnt}
          keywordList={keyword}
          reason={reason}
        />
      </div>
      <div className={styles.rightContainer}>
        <AiFeedback
        corpName={corpName}
        tradeAt={tradeAt}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        keywordList={keyword}
        reason={reason}
        stockCode={stockCode}
        aiAnalyze={aiAnalyze}
        />
      </div>
    </div>
  );
};

export default TradingRecordDetailPage;
