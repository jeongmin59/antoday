import AiFeedback from '../../components/AiFeedback/template/AiFeedback';
import ReadingTrade from '../../components/AiFeedback/template/ReadingTrade';
import styles from './TradingRecordDetailPage.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const TradingRecordDetailPage = () => {

  const {tradePk} = useParams();

    const {
      data: tradeResults,
      // isLoading,
      // isError,
    } = useQuery(
      "tradeResults",
      async () => {
        if (!tradePk) {
          // tradePk가 nul인 경우 요청 보내지 않기
          return;
        }
  
        try {
          const response = await axios.get(
            import.meta.env.VITE_BACK_API_URL +
              `/api/trade/${tradePk}`);
          
          return response;
        } catch (error) {
          console.error("매매 기록 불러오는 axios 요청 실패", error);
        }
      }
    );
  
    const tradeAt = tradeResults?.data.tradeAt;
    const reason = tradeResults?.data.reason;
    const keyword = tradeResults?.data.keyword;
    const corpName = tradeResults?.data.corpName;
    const logoUrl = tradeResults?.data.logoUrl;
    const optionBuySell = tradeResults?.data.optionBuySell;
    const price = tradeResults?.data.price;
    const cnt = tradeResults?.data.cnt;
    const aiAnalyze = tradeResults?.data.aiAnalyze;

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
    aiAnalyze={aiAnalyze}
    />
    </div>
  </div>
  );
};

export default TradingRecordDetailPage;
