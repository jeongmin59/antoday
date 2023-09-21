import React, { useState, useEffect } from "react";
import styles from "./StockChart.module.css";
import ReactApexChart from "react-apexcharts";

const StockChart = () => {
  const [series, setSeries] = useState([
    {
      name: "XYZ MOTORS",
      data: [
        {
          x: new Date("2023-01-01").getTime(),
          y: 100,
        },
        {
          x: new Date("2023-01-02").getTime(),
          y: 110,
        },
        {
          x: new Date("2023-01-03").getTime(),
          y: 130,
        },
        {
          x: new Date("2023-01-04").getTime(),
          y: 90,
        },
        {
          x: new Date("2023-01-05").getTime(),
          y: 80,
        },
        {
          x: new Date("2023-01-06").getTime(),
          y: 210,
        },
        {
          x: new Date("2023-01-07").getTime(),
          y: 110,
        },
        {
          x: new Date("2023-01-08").getTime(),
          y: 150,
        },
        {
          x: new Date("2023-01-09").getTime(),
          y: 120,
        },
        {
          x: new Date("2023-01-10").getTime(),
          y: 160,
        },
        {
          x: new Date("2023-01-11").getTime(),
          y: 220,
        },
        {
          x: new Date("2023-01-12").getTime(),
          y: 180,
        },
        {
          x: new Date("2023-01-13").getTime(),
          y: 240,
        },
        {
          x: new Date("2023-01-14").getTime(),
          y: 250,
        },
      ],
    },
  ]);

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
      text: "주식차트",
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

  useEffect(() => {
    // 데이터를 가져오거나 처리하는 코드를 이곳에 추가할 수 있습니다.
  }, []);

  return (
    <div className={styles.chartContainer}>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default StockChart;
