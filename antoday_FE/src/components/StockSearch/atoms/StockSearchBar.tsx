import React, { useEffect, useState } from "react";
import StockSearchResults from "./StockSearchResults";
import { useQuery, useQueryClient } from "react-query";
import styles from "./StocksSearchBar.module.css";
import axios from "axios";
import SearchBottomSheet from "./SearchBottomSheet";

const StockSearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    // console.log('입력값이 변경되었습니다:', inputValue);
    // console.log('전체페이지수는',totalPage);
    queryClient.invalidateQueries("searchResults");
    console.log("제발나와줘", totalPage);
  }, [inputValue, totalPage]);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery(
    ["searchResults", inputValue],
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

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();
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
      {inputValue && (
        <SearchBottomSheet keyword={inputValue} totalPage={totalPage} />
      )}
    </React.Fragment>
  );
};

export default StockSearchBar;
