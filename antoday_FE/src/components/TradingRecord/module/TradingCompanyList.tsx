import React from "react";
import StockComponent from "../atom/StockComponent";
import styles from "./TradingCompanyList.module.css";

interface StockSearchResultsProps {
  searchResults: StockResult[]; 
  loadData: () => void;
  onSelectCompany: (stockCode: string) => void;
  sourcePage: "WriteTradingRecord" | "TradingRecordPage";
}

interface StockResult {
    stockCode: string;
    logoUrl: string;
    corpName: string;
  }

const TradingCompanyList: React.FC<StockSearchResultsProps> = ({
  searchResults,
  loadData,
  onSelectCompany,
  sourcePage
}) => {
  // console.log("결과는", searchResults);

  // map 함수에서는 반드시 반환값이 있어야 함!
  // searchResults?.map((result, index) => {
  //   console.log(`Result ${index + 1}: ${result}`, result);
  //   return null;
  // });
  const handleStockClick = (stockCode:string) => {
    if (sourcePage === "TradingRecordPage") {
      loadData();
    }
    onSelectCompany(stockCode);
  }
  return (
    <React.Fragment>
      <div>
        {searchResults?.length === 0 ? (
          <div className={styles.stockSearchResultsContainer}>
            검색결과가 없습니다.
          </div>
        ) : (
          <div className={styles.stockSearchResultsContainer}>
            {searchResults?.map((result, index) => (
              <StockComponent
                key={index}
                companyInfo={result}
                loadData={loadData}
                onClick={() => handleStockClick(result.stockCode)}
              />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
//알수없는 빨간줄...
export default TradingCompanyList;
