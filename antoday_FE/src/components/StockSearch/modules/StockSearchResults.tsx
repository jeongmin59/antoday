import React from "react";
import StockInfoComponent from "../atoms/StockInfoComponent";

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
  // console.log("결과는", searchResults);

  // map 함수에서는 반드시 반환값이 있어야 함!
  // searchResults?.map((result, index) => {
  //   console.log(`Result ${index + 1}: ${result}`, result);
  //   return null;
  // });

  const loadMore = () => {
    // 다음 페이지로 이동하는 함수
    if (nowPage < totalPage) {
      setNowPage((prevPage) => prevPage + 1);
    }
  };

  const loadPrevious = () => {
    // 이전 페이지로 이동하는 함수
    if (nowPage > 0) {
      setNowPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <React.Fragment>
      <div>
        {searchResults?.length === 0 ? (
          <p>검색결과가 없습니다.</p>
        ) : (
          <div>
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
      {searchResults && (
        <div>
          <button onClick={loadPrevious} disabled={nowPage === 0}>
            이전
          </button>
          <button onClick={loadMore} disabled={nowPage >= totalPage - 1}>
            다음
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default StockSearchResults;
