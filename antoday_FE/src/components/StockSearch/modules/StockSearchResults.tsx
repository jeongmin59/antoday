import React from "react";
import StockInfoComponent from "../atoms/StockInfoComponent";
import styles from "./StockSearchResults.module.css";

interface StockSearchResultsProps {
  searchResults: string[];
  isLoading: boolean;
  isPreviousData: boolean;
  isError: boolean;
  nowPage: number;
  totalPage: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
}

const StockSearchResults: React.FC<StockSearchResultsProps> = ({
  searchResults,
  isLoading,
  isPreviousData,
  isError,
  nowPage,
  totalPage,
  setNowPage,
}) => {
  console.log("결과는", searchResults);

  // map 함수에서는 반드시 반환값이 있어야 함!
  // searchResults?.map((result, index) => {
  //   console.log(`Result ${index + 1}: ${result}`, result);
  //   return null;
  // });

  return (
    <React.Fragment>
      <div>
        {searchResults?.length === 0 ? (
          <div className={styles.stockSearchResultsContainer}>
            검색결과가 없습니다.
          </div>
        ) : (
          <div className={styles.stockSearchResultsContainer}>
            {searchResults?.map((result, index) => (
              <StockInfoComponent
                key={index}
                isLoading={isLoading}
                companyInfo={result}
              />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
//알수없는 빨간줄...
export default StockSearchResults;
