import React from "react";
import StockInfoComponent from "../atom/StockInfoComponent";
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
