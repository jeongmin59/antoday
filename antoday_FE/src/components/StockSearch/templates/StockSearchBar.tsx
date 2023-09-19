import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styles from "./StocksSearchBar.module.css";
import axios from "axios";
import useDebounce from "../../../utils/useDebounce";
import StockSearchResults from "../atoms/StockSearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StockSearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [nowPage, setNowPage] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const debouncedInputValue = useDebounce({
    value: inputValue,
    delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  });

  useEffect(() => {
    //이게 무슨 함수였더라...
    queryClient.invalidateQueries("searchResults");
  }, [debouncedInputValue, nowPage]);

  const {
    data: searchResults,
    isLoading,
    isPreviousData,
    isError,
  } = useQuery(
    ["searchResults", inputValue, nowPage],
    async () => {
      if (!inputValue) {
        // inputValue가 빈 문자열인 경우 요청 보내지 않음
        return;
      }

      const params = new URLSearchParams();
      params.append("keyword", inputValue);
      params.append("page", nowPage.toString());
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACK_API_URL +
            `/api/corp/search?${params.toString()}`
        );

        // console.log("키워드는", inputValue);
        // console.log("현재페이지는", nowPage);
        // console.log("검색결과는", response.data.content);
        setTotalPage((prevTotalPage) => response.data.totalPages);

        return response.data;
      } catch (error) {
        console.error("에러발생:", error);
        throw error;
      }
    },
    {
      enabled: !!inputValue, // inputValue 값이 변경될 때만 실행
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const search = () => {
    // useQuery 실행
    queryClient.invalidateQueries("searchResults");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();
    await search();
    await setIsSubmit(true);
  };

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
      <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
        <FontAwesomeIcon icon={faSearch} color={"var(--main-blue-color)"} />
        <input
          type="text"
          placeholder="회사명, 종목명 검색"
          value={inputValue}
          onChange={handleChange}
          className={styles.inputBox}
        />
        <button type="submit" className={styles.searchButton}>
          search
        </button>
      </form>
      <StockSearchResults
        searchResults={searchResults?.content}
        isLoading={isLoading}
        isPreviousData={isPreviousData}
        isError={isError}
      />
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

export default StockSearchBar;
