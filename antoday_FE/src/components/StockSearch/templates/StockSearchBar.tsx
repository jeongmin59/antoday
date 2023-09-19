import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styles from "./StocksSearchBar.module.css";
import axios from "axios";
import useDebounce from "../../../utils/useDebounce";
import StockSearchResults from "../modules/StockSearchResults";
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
    //"searchResults"라는 키에 해당하는 쿼리의 캐시가 무효화되고, 새로운 데이터를 가져오게 하는 함수
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
    // 검색창에 다시 검색할 때, isSubmit을 false로 초기화해야하나
    setIsSubmit(false);
  };

  const search = () => {
    // useQuery 실행
    queryClient.invalidateQueries("searchResults");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();

    // 검색 키워드가 null이 아니면 submit이 가능하게 하고, submit true로 인식하게 하기
    if (inputValue) {
      setIsSubmit(true);
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
      {!isSubmit && (
        <StockSearchResults
          searchResults={searchResults?.content}
          isLoading={isLoading}
          isPreviousData={isPreviousData}
          isError={isError}
          nowPage={nowPage}
          setNowPage={setNowPage}
          totalPage={totalPage}
        />
      )}
      {isSubmit && <p>검색결과 이게 진짜다</p>}
    </React.Fragment>
  );
};

export default StockSearchBar;
