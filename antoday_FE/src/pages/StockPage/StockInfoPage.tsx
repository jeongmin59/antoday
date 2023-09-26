import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./StockInfoPage.module.css";
import InfoPageSearchBar from "../../components/StockInfo/template/InfoPageSearchBar";
import StockInfoBasic from "../../components/StockInfo/template/StockInfoBasic";
import StockInfoSummary from "../../components/StockInfo/template/StockInfoSummary";
import StockInfoDetail from "../../components/StockInfo/template/StockInfoDetail";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Common/atom/LoadingSpinner";

interface Params {
  [stockPk: string]: string | undefined;
}

const StockInfoPage: React.FC = () => {
  const stockPk = useParams<Params>()?.stockPk || "";
  const [corpIntro, setCorpIntro] = useState<stockIntro>([]);
  const [corpInfo, setCorpInfo] = useState<string[]>([]);
  const [graphValue, setGraphValue] = useState(null);

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

  useEffect(() => {}, [stockInfoResults, stockIntro]);

  return (
    <div className={styles.stockInfoPageContainer}>
      <InfoPageSearchBar />
      <StockInfoBasic corpIntro={corpIntro} />
      <StockInfoSummary />
      <StockInfoDetail
        stockPk={stockPk}
        graphValue={graphValue}
        corpInfo={corpInfo}
      />
    </div>
  );
};

export default StockInfoPage;
