import { useQuery } from 'react-query';
import BasicInfo from '../module/BasicInfo';
import ReasonKeywords from '../module/ReasonKeywords';
import ReasonTexts from '../module/ReasonTexts';
import styles from './ReadingTrade.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReadingTrade = () => {
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
          console.log("axios 요청 성공",response.data);
          return response;
        } catch (error) {
          console.error("axios 요청 실패", error);
          throw error;
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

  return ( 
    <div>
      <div className={styles.basicContainer}>
        <div>매매일지</div>
        {/* <BasicButton content={'수정'}/> */}
        {/* <BasicButton content={'삭제'}/> */}
      </div>
      <BasicInfo 
      corpName={corpName}
      tradeAt={tradeAt}
      logoUrl={logoUrl}
      optionBuySell={optionBuySell}
      price={price}
      cnt={cnt}
      />
      <ReasonKeywords
      keywordList={keyword}
      />
      <ReasonTexts
      reason={reason}
      />
    </div>
  );
}

export default ReadingTrade;