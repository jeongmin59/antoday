import { useParams } from "react-router-dom";
import StockInfoPage from "../../../pages/StockPage/StockInfoPage";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import useDebounce from "../../../utils/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./InfoPageSearchBar.module.css"
// import StockSearchList from "../../StockSearch/module/StockSearchList";
import StockSearchResults from "../../StockSearch/module/StockSearchResults";

interface Params {
  [stockPk: string]: string | undefined;
}

const InfoPageSearchBar : React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const tempStockPk = useParams<Params>()?.stockPk || "";
  const [stockPk, setStockPk] = useState(tempStockPk);
  const queryClient = useQueryClient();
  const [nowPage, setNowPage] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const debouncedInputValue = useDebounce({
    value: inputValue,
    delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  });

  useEffect(() => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();

    // 검색 키워드가 null이 아니면 submit이 가능하게 하고, submit true로 인식하게 하기
    if (inputValue) {
      setIsSubmit(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // 검색창에 다시 검색할 때, isSubmit을 false로 초기화
    setIsSubmit(false);
  };

  return (
    <div className={styles.mainContainer}>
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
      {!isSubmit && searchResults && (
        <StockSearchResults
          searchResults={searchResults?.content}
          isLoading={isLoading}
          isPreviousData={isPreviousData}
          isError={isError}
          nowPage={nowPage}
          setNowPage={setNowPage}
          totalPage={0}
        />
      )}
    <StockInfoPage stockPk={stockPk} />
    </div>
  );
};

export default InfoPageSearchBar;
