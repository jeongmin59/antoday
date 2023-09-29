import React, { useEffect, useState } from "react";
import styles from "./RevenueAndProfit.module.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Label,
} from "recharts";

interface StockInfoDetailProps {
  graphValue?: {
    takes: { year: number; take: number; take_kr: string }[];
    profits: { year: number; prpfit: number; profit_kr: string }[];
  };
}

const RevenueAndProfit: React.FC<StockInfoDetailProps> = ({ graphValue }) => {
  const [selectedTab, setSelectedTab] = useState<"revenue" | "profit">(
    "revenue"
  );

  const handleTabClick = (tab: "revenue" | "profit") => {
    setSelectedTab(tab);
  };

  const isRevenueTabSelected = selectedTab === "revenue";

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (graphValue) {
      const data = isRevenueTabSelected
        ? graphValue?.takes.map((item) => ({
            year: item.year,
            y: item.take,
            text: item.take_kr,
          }))
        : graphValue?.profits.map((item) => ({
            year: item.year,
            y: item.prpfit,
            text: item.profit_kr,
          }));

      setChartData(data);
    }
  }, [graphValue, isRevenueTabSelected]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>매출액 및 영업이익</div>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            isRevenueTabSelected ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("revenue")}
        >
          매출액
        </div>
        <div
          className={`${styles.tab} ${
            !isRevenueTabSelected ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("profit")}
        >
          영업이익
        </div>
      </div>
      <div className={styles.graph}>
        {chartData.length > 0 ? (
          <BarChart
            width={280}
            height={180}
            data={chartData}
            margin={{ top: 15, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year">
              <Label offset={0} position="insideBottom" />
            </XAxis>
            <Bar dataKey="y" fill="#8884d8" barSize={50}>
              <LabelList dataKey="text" position="top" fontSize={12} />
            </Bar>
          </BarChart>
        ) : (
          <div className={styles.nullComment}>
            현재 데이터를 불러올 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueAndProfit;
