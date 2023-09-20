import React from "react";
import styles from "./StockSearchList.module.css";
import StockInfoComponent from "../atoms/StockInfoComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
          <div className={styles.stockSearchListContainer}>
            검색 결과가 없습니다
          </div>
        ) : (
          <div className={styles.stockSearchListContainer}>
            {searchResults?.map((result, index) => (
              <StockInfoComponent
                key={index}
                isLoading={isLoading}
                companyInfo={result}
              />
            ))}
            <div>
              <button
                className={styles.button}
                onClick={loadPrevious}
                disabled={nowPage === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span style={{ fontSize: "var(--font-h6)" }}>{nowPage + 1}</span>
              <button
                className={styles.button}
                onClick={loadMore}
                disabled={nowPage >= totalPage - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default StockSearchList;
