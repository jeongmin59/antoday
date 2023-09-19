import React from "react";
import StockInfoComponent from "./StockInfoComponent";

interface StockSearchResultsProps {
  searchResults: string[];
  isLoading: boolean;
  isPreviousData: boolean;
  isError: boolean;
}

const StockSearchResults: React.FC<StockSearchResultsProps> = ({
  searchResults,
  isLoading,
  isPreviousData,
  isError,
}) => {
  // console.log("결과는", searchResults);
  console.log("로딩중?", isLoading);

  // searchResults 배열을 돌면서
  searchResults?.map((result, index) => {
    console.log(`Result ${index + 1}: ${result}`, result);
    return null; // map 함수에서는 반드시 반환값이 있어야 함
  });

  return (
    <React.Fragment>
      {/* {isLoading ? (
        "로딩 중..."
      ) : isError ? (
        "에러 발생"
      ) : (
        <div>
          {searchResults?.map((result, index) => (
            <StockInfoComponent key={index} companyInfo={result} />
          ))}
        </div>
      )} */}
      <div>
        {searchResults?.map((result, index) => (
          <StockInfoComponent
            key={index}
            isLoading={isLoading}
            companyInfo={result}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default StockSearchResults;
