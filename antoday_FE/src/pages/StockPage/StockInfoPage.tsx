import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./StockInfoPage.module.css";
import InfoPageSearchBar from "../../components/StockInfo/module/InfoPageSearchBar";
import StockInfoBasic from "../../components/StockInfo/template/StockInfoBasic";
import StockInfoSummary from "../../components/StockInfo/template/StockInfoSummary";
import StockInfoDetail from "../../components/StockInfo/template/StockInfoDetail";

const StockInfoPage: React.FC = () => {
  const { stockPk } = useParams();

  // const {
  //   data: stockInfoResults,
  //   isLoading,
  //   isError,
  // } = useQuery(
  //   "stockInfoResults",
  //   async () => {

  //     const params = new URLSearchParams();
  //     params.append("keyword", inputValue);
  //     params.append("page", nowPage.toString());
  //     try {
  //       const response = await axios.get(
  //         import.meta.env.VITE_BACK_API_URL +
  //           `/api/corp/search?${params.toString()}`
  //       );

  //       return response.data;
  //     } catch (error) {
  //       console.error("에러발생:", error);
  //       throw error;
  //     }
  //   },
  //   {
  //     enabled: !!inputValue, // inputValue 값이 변경될 때만 실행
  //   }
  // );

  return (
    <div className={styles.stockInfoPageContainer}>
      <InfoPageSearchBar />
      <StockInfoBasic stockPk={stockPk} />
      <StockInfoSummary />
      <StockInfoDetail />
    </div>
  );
};

export default StockInfoPage;
