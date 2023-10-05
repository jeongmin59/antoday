import { useEffect, useState } from "react";
import styles from "./CustomBubbleChart.module.css";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";

interface WordCloudData {
  label: string;
  value: number;
}

const CustomBubbleChart: React.FC = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.75);
  const [words, setWords] = useState<WordCloudData[]>(data);
  const [corps, setCorps] = useState(null);
  const [mainKeyword, setMainKeyword] = useState(null);

  const bubbleClick = async (label: string) => {
    console.log(label, "클릭");
    try {
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + "/keyword/" + label
      );
      const data = response.data;
      setWords(data.cloud);
      setCorps(data.corps);
      setMainKeyword(label);
      console.log("클릭호출");
    } catch (error) {
      console.error("호출 실패 :", error);
    }
  };

  const updateChartSize = () => {
    setChartWidth(window.innerWidth * 0.75);
  };

  useEffect(() => {
    window.addEventListener("resize", updateChartSize);
    return () => {
      window.removeEventListener("resize", updateChartSize);
    };
  }, []);

  return (
    <>
      <div className={styles.bubbleChartContainer}>
        {mainKeyword !== null ? (
          <p className={styles.keywordTag}>#{mainKeyword} 관련 키워드</p>
        ) : null}
      </div>
      <BubbleChart
        bubbleClickFun={bubbleClick}
        graph={{
          zoom: 0.9,
        }}
        padding={10}
        data={words}
        width={chartWidth}
        height={chartWidth}
        showLegend={false}
        labelFont={{
          size: 15,
          color: "#fff",
          weight: "light",
        }}
        valueFont={{
          size: 0,
        }}
      />
    </>
  );
};

export default CustomBubbleChart;
