import React from "react";

interface companyinfo {
  corpCode: string;
  corpName: string;
  isLiked: any;
  logoUrl: string;
}

interface StockSearchResultProps {
  companyInfo: string; // 기업 정보를 받을 prop
}

const StockInfoComponent: React.FC<StockSearchResultProps> = ({
  companyInfo,
}) => {
  return (
    <div className="stockSearchResult">
      <h2>기업 정보</h2>
      <p>{companyInfo}</p>
    </div>
  );
};

export default StockInfoComponent;
