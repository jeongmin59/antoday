import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";

interface StockSearchResultsProps {
  keyword: string;
  totalPage: number;
}

const SearchBottomSheet: React.FC<StockSearchResultsProps> = ({
  keyword,
  totalPage,
}) => {
  console.log("프롭스를 확인", keyword, totalPage);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("searchResults");
  }, [keyword, totalPage]);

  const fetchSearchResults = async (page: number) => {
    const params = new URLSearchParams();
    params.append("keyword", keyword);
    params.append("page", "0"); // 페이지 번호를 전달

    const response = await axios.get(
      import.meta.env.VITE_BACK_API_URL +
        `/api/corp/search?${params.toString()}`
    );

    return response.data;
  };

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery(
    ["searchResults", keyword],
    async () => {
      if (!keyword || totalPage === 0) {
        // keyword가 빈 문자열인 경우 요청 보내지 않음 그리고 빈배열 리턴
        return [];
      }

      const pages = Array.from({ length: totalPage }, (_, index) => index);
      const results = await Promise.all(
        pages.map((page) => fetchSearchResults(page))
      );

      console.log("여기?", pages, results);

      // 결과 배열을 flatten하여 반환
      return results.flat();
    },
    {
      enabled: !!keyword,
    }
  );

  console.log("이게안되네", searchResults);

  return (
    <React.Fragment>
      {isLoading ? "로딩 중..." : isError ? "에러 발생" : <div>결과렌더링</div>}
    </React.Fragment>
  );
};

export default SearchBottomSheet;
