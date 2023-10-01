import AiFeedback from "../../components/AiFeedback/template/AiFeedback";
import ReadingTrade from "../../components/AiFeedback/template/ReadingTrade";
import styles from "./TradingRecordDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../recoil/auth";

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
  const navigator = useNavigate();
  const token = useRecoilValue(accessTokenAtom);

  const handleEdit = () => {
    navigator(`/tradingrecord/edit/${tradePk}`)
  }

  const handleDelete = async () => {
    const url = import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("삭제 완료!");
      navigator("/tradingrecord");
    } else {
      console.error(await response.text());
    }
  };

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
      <div>
        <button  onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
      </div>
    </div>
  );
};

export default TradingRecordDetailPage;
