import React, { useEffect, useState } from "react";
import styles from "./RevenueAndProfit.module.css";
import ReactApexChart from 'react-apexcharts';

interface StockInfoDetailProps {
  graphValue?: { takes: { year: number; take: number }[], profits: { year: number; profit: number }[] };
}

const RevenueAndProfit: React.FC<StockInfoDetailProps> = ({ graphValue }) => {
  const [chartData, setChartData] = useState<any>({
    takes: [],
    profits: []
  });

  useEffect(() => {
    if (graphValue) {
      const takesData = graphValue.takes.map(item => ({
        x: item.year,
        y: item.take
      }));
      const profitsData = graphValue.profits.map(item => ({
        x: item.year,
        y: item.profit
      }));
      setChartData({
        takes: takesData,
        profits: profitsData
      });
    }
  }, [graphValue]);

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: graphValue?.takes.map(item => item.year)
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>매출액 및 영업이익</div>
      <div className={styles.graph}>
        <ReactApexChart
          options={chartOptions}
          series={[
            {
              name: '매출',
              data: chartData.takes
            },
            {
              name: '영업이익',
              data: chartData.profits
            }
          ]}
          type="bar"
        />
      </div>
    </div>
  );
};

export default RevenueAndProfit;

// help