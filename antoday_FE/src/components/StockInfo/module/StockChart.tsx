import React, { useState } from "react";
import styles from "./StockChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import axios from "axios";

interface StockChartProps{
  stockPk : string;
}

const StockChart : React.FC<StockChartProps>= ({stockPk}) => {
  const [dateOption, setDateOption] = useState<string>("1 개월"); // 초기값 설정

  const {
    data: chartData,
    // isLoading,
    // isError,
  } = useQuery(
    ["chartData", dateOption],
    async () => {

      const params = new URLSearchParams();
      params.append("stock_code", stockPk);
      params.append("date_option", dateOption);
      
      try {
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL +
            `/corp/stock?${params.toString()}`
        );

        const responseData = response.data;

        const transformedData = {
          name: "주식 차트",
          data: responseData.date.map((dateString: string, index: number) => ({
            x: new Date(dateString).getTime(),
            y: responseData.close[index],
          })),
        };

        return transformedData;
      } catch (error) {
        console.error("에러:", error);
        throw error;
      }
    },
    {
      enabled: !!dateOption, // dateOption 변경될 때 실행
    }
  );

  // const [stockData, setStockData] = useState([transformedData]);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "",
      align: "center",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  });

  const handleButtonClick = (option: string) => {
    setDateOption(option);
  };

  return (
    <div className={styles.chartContainer}>
      {chartData ? (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={[chartData]}
          type="area"
          height={300}
        />
        <div className={styles.buttonsContainer}>
        <button
          className={dateOption === "1 개월" ? styles.selectedButton : styles.button}
          onClick={() => handleButtonClick("1 개월")}
        >
          1 개월
        </button>
        <button
          className={dateOption === "3 개월" ? styles.selectedButton : styles.button}
          onClick={() => handleButtonClick("3 개월")}
        >
          3 개월
        </button>
        <button
          className={dateOption === "1 년" ? styles.selectedButton : styles.button}
          onClick={() => handleButtonClick("1 년")}
        >
          1 년
        </button>
        <button
          className={dateOption === "3 년" ? styles.selectedButton : styles.button}
          onClick={() => handleButtonClick("3 년")}
        >
          3 년
        </button>
        <button
          className={dateOption === "5 년" ? styles.selectedButton : styles.button}
          onClick={() => handleButtonClick("5 년")}
        >
          5 년
        </button>
      </div>
        </div>
        ):(
          <div>Loading...</div>
        )
        }
    </div>
  );
};
//
export default StockChart;
