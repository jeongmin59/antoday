import React from "react";

interface StockSearchResultProps {
  companyInfo: CompanyInfo; // 기업 정보를 받을 prop
}

const StockInfoComponent: React.FC<StockSearchResultProps> = ({
  companyInfo,
}) => {
  return (
    <div className="stockSearchResult">
      <img src={companyInfo.logoUrl} alt="기업이미지" />
      <p>{companyInfo.corpName}</p>
    </div>
  );
};

export default StockInfoComponent;
