import React, { useState, useEffect } from "react";
import styles from "./StockChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import axios from "axios";

interface StockChartProps{
  stockPk : string;
}

const StockChart : React.FC<StockChartProps>= ({stockPk}) => {

  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery(
    "chartData",
    async () => {

      const params = new URLSearchParams();
      params.append("stock_code", stockPk);
      params.append("date_option", '1 개월');
      
      try {
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL +
            `/corp/stock?${params.toString()}`
        );

        return response.data;
      } catch (error) {
        console.error("에러:", error);
        throw error;
      }
    }
  );

  const transformedData = {
    name: "주식 차트",
    data: chartData.date.map((dateString : string, index: number) => ({
      x: new Date(dateString).getTime(),
      y: chartData.close[index]
    }))
  };

  const [tempData, setTempData] = useState([transformedData]);

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
        formatter: function (val: any) {
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
        formatter: function (val: any) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  });

  return (
    <div className={styles.chartContainer}>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={tempData}
          type="area"
          height={300}
        />
      </div>
    </div>
  );
};
//
export default StockChart;
