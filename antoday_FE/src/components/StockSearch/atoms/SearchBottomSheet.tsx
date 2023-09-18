import React from "react";

interface StockSearchResultsProps {
  keyword: string;
  totalPage: number;
}

const SearchBottomSheet: React.FC<StockSearchResultsProps> = ({
  keyword,
  totalPage,
}) => {
  return <React.Fragment>아래로 내려오는 그 검색 결과 창 그거</React.Fragment>;
};

export default SearchBottomSheet;
