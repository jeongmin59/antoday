import React, { useState, useEffect } from "react";
import styles from "./StockInfoPage.module.css";
import StockInfoBasic from "../../components/StockInfo/template/StockInfoBasic";
import StockInfoSummary from "../../components/StockInfo/template/StockInfoSummary";
import StockInfoDetail from "../../components/StockInfo/template/StockInfoDetail";
import { useQuery } from "react-query";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface StockInfoPageProps {
  stockPk: string;
}

const StockInfoPage: React.FC<StockInfoPageProps> = ({stockPk}) => {
  // const stockPk = useParams<Params>()?.stockPk || "";
  const [corpIntro, setCorpIntro] = useState<stockIntro>([]);
  const [corpInfo, setCorpInfo] = useState<any>(null);
  const [graphValue, setGraphValue] = useState<any>(null);
  const [corpOverview, setCorpOverview] = useState<any>(null);

  const {
    data: stockInfoResults,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery("stockInfoResults", async () => {
    const params = new URLSearchParams();
    params.append("stock_code", stockPk);

    try {
      const response = await axios.get(
        import.meta.env.VITE_DATA_API_URL +
          `/corp/overview?${params.toString()}`
      );
      // console.log("결과값은", response.data);
      setCorpInfo(response.data.indicator);
      setGraphValue(response.data.value);
      setCorpOverview(response.data.info);
      return response.data;
    } catch (error) {
      console.error("overview 실패", error);
      throw error;
    }
  });

  const {
    data: stockIntro,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery("stockIntro", async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_DATA_API_URL + `/corp/index/${stockPk}`
      );
      setCorpIntro(response.data);

      return response.data;
    } catch (error) {
      console.error("기본정보 실패", error);
      throw error;
    }
  });

  console.log('뭘까',stockInfoResults)

  useEffect(() => {}, [stockInfoResults, stockIntro]);

  if (isLoading1 || isLoading2) {
    return (
      <div className={styles.stockInfoPageContainer}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
    </div>
    );
  }

  return (
    <div className={styles.stockInfoPageContainer}>
      <StockInfoBasic corpIntro={corpIntro} />
      <StockInfoSummary />
      <StockInfoDetail
        stockPk={stockPk}
        graphValue={graphValue}
        corpInfo={corpInfo}
        corpIntro={corpIntro}
        corpOverview={corpOverview}
      />
    </div>
  );
};

export default StockInfoPage;
