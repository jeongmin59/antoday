import React, { useEffect, useState } from "react";
import styles from "./RevenueAndProfit.module.css";
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const RevenueAndProfit: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    takes: [],
    profits: []
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL + '/corp/overview', 
        {
          params: {
            stock_code: `${stock_code}`
          }
        });
        setChartData(response.data.value);
        console.log(response)

      } catch (error) {
        console.error('에러', error);
      }
    };

    getData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: chartData.takes.map((item: any) => item.year)
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>매출액 및 영업이익</div>
      <div className={styles.graph}>
        <ReactApexChart options={chartOptions} series={[{
          name: '매출',
          data: chartData.takes.map((item: any) => item.take)
        }, {
          name: '영업이익',
          data: chartData.profits.map((item: any) => item.prpfit)
        }]} type="bar" />
      </div>
    </div>
  );
};

export default RevenueAndProfit;
