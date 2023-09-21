import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import StockInfoTab from "../module/StockInfoTab";
import StockChart from "../module/StockChart";
import CompanyOverview from "../module/CompanyOverview";
import StockInformation from "../module/StockInformation";
import RevenueAndProfit from "../module/RevenueAndProfit";
import StockWordCloud from "../module/StockWordCloud";

const StockInfoDetail = () => {
  return (
    <React.Fragment>
      <StockInfoTab />
      <StockChart />
      <CompanyOverview />
      <StockInformation />
      <RevenueAndProfit />
      <StockWordCloud />
    </React.Fragment>
  );
};

export default StockInfoDetail;
