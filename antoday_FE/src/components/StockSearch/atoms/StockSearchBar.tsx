import React, { useEffect, useState } from "react";
import StockSearchResults from "./StockSearchResults";
import { useQuery, useQueryClient } from "react-query";
import styles from "./StocksSearchBar.module.css";
import axios from "axios";
import SearchBottomSheet from "./SearchBottomSheet";
import useDebounce from "../../../utils/useDebounce";

const StockSearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const queryClient = useQueryClient();

  const debouncedInputValue = useDebounce({
    value: inputValue,
    delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  });

  useEffect(() => {
    // console.log('입력값이 변경되었습니다:', inputValue);
    // console.log('전체페이지수는',totalPage);
    queryClient.invalidateQueries("searchResults");
    // console.log("제발나와줘", totalPage);
  }, [debouncedInputValue, currentPage]);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery(
    ["searchResults", inputValue, currentPage],
    async () => {
      if (!inputValue) {
        // inputValue가 빈 문자열인 경우 요청 보내지 않음
        return;
      }

      const params = new URLSearchParams();
      params.append("keyword", inputValue);
      params.append("page", "0");
      const response = await axios.get(
        import.meta.env.VITE_BACK_API_URL +
          `/api/corp/search?${params.toString()}`
      );

      console.log("키워드는", inputValue);
      console.log("전체페이지는", response.data.totalPages);
      console.log("검색결과는", response.data.content);
      setTotalPage(response.data.totalPages);

      return response.data; // inputValue 값이 변경될 때만 실행
    },
    {
      enabled: !!inputValue,
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const search = () => {
    // useQuery 실행
    queryClient.invalidateQueries("searchResults");
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();
    setCurrentPage(0); // 검색 시 첫 페이지로 리셋
    await search();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
        {/* <img src="#" alt="검색아이콘" /> */}
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={inputValue}
          onChange={handleChange}
          className={styles.inputBox}
        />
        <button type="submit" className={styles.searchButton}>
          search
        </button>
      </form>

      {totalPage > 0 && (
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 0}>
            이전 페이지
          </button>
          <span>페이지 {currentPage + 1}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPage - 1}
          >
            다음 페이지
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default StockSearchBar;
