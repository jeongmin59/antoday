import React, { useEffect, useState } from "react";
import styles from "./RevenueAndProfit.module.css";
import ReactApexChart from 'react-apexcharts';

interface StockInfoDetailProps {
  graphValue?: { takes: { year: number; take: number }[], profits: { year: number; prpfit: number }[] };
}

const formatNumber = (number: number) => {
  const absoluteNumber = Math.abs(number);

  if (absoluteNumber < 10000) {
    return `${number >= 0 ? '' : '-'}${absoluteNumber.toLocaleString()}원`;
  } else if (absoluteNumber < 100000000) {
    const unit = Math.floor(absoluteNumber / 10000);
    const remainder = absoluteNumber % 10000;
    return `${number >= 0 ? '' : '-'}${unit}조 ${remainder.toLocaleString()}원`;
  } else {
    const unit = Math.floor(absoluteNumber / 100000000);
    const remainder = absoluteNumber % 100000000;
    const thousand = Math.floor(remainder / 10000);
    return `${number >= 0 ? '' : '-'}${unit}조 ${thousand}천 ${remainder.toLocaleString()}원`;
  }
};

const RevenueAndProfit: React.FC<StockInfoDetailProps> = ({ graphValue }) => {
  const [chartData, setChartData] = useState<any>({
    takes: [],
    profits: []
  });
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    if (graphValue) {
      const takesData = graphValue.takes.map(item => ({
        x: item.year,
        y: formatNumber(item.take)
      }));

      const profitsData = graphValue.profits.map(item => ({
        x: item.year,
        y: formatNumber(item.prpfit)
      }));

      setChartData({
        takes: takesData,
        profits: profitsData
      });
    }
  }, [graphValue]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const isRevenueTabSelected = selectedTab === 'revenue';

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: isRevenueTabSelected ? graphValue?.takes.map(item => item.year) : graphValue?.profits.map(item => item.year)
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>매출액 및 영업이익</div>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${isRevenueTabSelected ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('revenue')}
        >
          매출액
        </div>
        <div
          className={`${styles.tab} ${!isRevenueTabSelected ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('profit')}
        >
          영업이익
        </div>
      </div>
      <div className={styles.graph}>
        {graphValue ? (
          <ReactApexChart
            options={chartOptions}
            series={[
              {
                name: isRevenueTabSelected ? '매출' : '영업이익',
                data: isRevenueTabSelected ? chartData.takes : chartData.profits
              }
            ]}
            type="bar"
          />
        ) : (
          <div className={styles.nullComment}>현재 데이터를 불러올 수 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RevenueAndProfit;
