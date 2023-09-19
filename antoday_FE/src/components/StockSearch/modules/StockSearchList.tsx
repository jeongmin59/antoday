import React from "react";
import styles from "./StockSearchList.module.css";
import StockInfoComponent from "../atoms/StockInfoComponent";

interface StockSearchListProps {
  searchResults: string[];
  isLoading: boolean;
  isPreviousData: boolean;
  isError: boolean;
  nowPage: number;
  totalPage: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
}

const StockSearchList: React.FC<StockSearchListProps> = ({
  searchResults,
  isLoading,
  isPreviousData,
  isError,
  nowPage,
  totalPage,
  setNowPage,
}) => {
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
          <p>검색결과가 없습니다?</p>
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

export default StockSearchList;
