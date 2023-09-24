import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StockInfoPage.module.css";
import InfoPageSearchBar from "../../components/StockInfo/template/InfoPageSearchBar";
import StockInfoBasic from "../../components/StockInfo/template/StockInfoBasic";
import StockInfoSummary from "../../components/StockInfo/template/StockInfoSummary";
import StockInfoDetail from "../../components/StockInfo/template/StockInfoDetail";
import { useQuery } from "react-query";
import axios from "axios";

const StockInfoPage: React.FC = () => {
  const { stockPk } = useParams();
  const [corpInfo,setCorpInfo] = useState(null);
  const [graphValue,setGraphValue] = useState(null);

  const {
    data: stockInfoResults,
    isLoading,
    isError,
  } = useQuery(
    "stockInfoResults",
    async () => {

      const params = new URLSearchParams();
      params.append("stock_code", stockPk);
      
      try {
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL +
            `/corp/overview?${params.toString()}`
        );
        setCorpInfo(response.data.info)
        setGraphValue(response.data.value)
        return response.data;
      } catch (error) {
        console.error("에러발생:", error);
        throw error;
      }
    }
  );

  console.log('종목정보',corpInfo)
  console.log('그래프그릴때쓸값',graphValue)

  return (
    <div className={styles.stockInfoPageContainer}>
      <InfoPageSearchBar />
      <StockInfoBasic stockPk={stockPk} />
      <StockInfoSummary />
      <StockInfoDetail stockPk={stockPk} graphValue={graphValue} />
    </div>
  );
};

export default StockInfoPage;
