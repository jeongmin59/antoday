import { useEffect, useState } from "react";
import styles from "./CustomBubbleChart.module.css";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import { corpDataAtom, wordDataAtom } from "../../../recoil/wordCloud";
import { useRecoilState } from "recoil";

interface WordCloudData {
  label: string;
  value: number;
}

interface CustomBubbleChartProps {
  data?: WordCloudData[] | null;
  CloudType?: string;
}

const CustomBubbleChart: React.FC<CustomBubbleChartProps> = ({
  data,
  CloudType,
}) => {
  if (data?.length == 0) {
    return <div>최근에 언급되지 않은 기업입니다.</div>;
  }
  console.log("props로 받아온 데이터", data);

  const [chartWidth, setChartWidth] = useState(
    window.innerWidth * (window.innerWidth >= 768 ? 0.65 : 0.75)
  );

  const [words, setWords] = useState(data);
  console.log("words", words);

  useEffect(() => {
    // 컴포넌트가 마운트된 이후에 data를 words에 설정
    setWords(data);
  }, [data]);

  const [corps, setCorps] = useRecoilState(corpDataAtom);
  const [mainKeyword, setMainKeyword] = useState(null);
  const [fontSize, setFontSize] = useState(
    window.innerWidth <= 480 ? 10 : window.innerWidth >= 1080 ? 20 : 15
  );
  const bubbleClick = async (label: string) => {
    if (CloudType == "홈" || CloudType == "작성") {
      try {
        const response = await axios.get<WordCloudData[]>(
          import.meta.env.VITE_DATA_API_URL + "/keyword/" + label
        );
        const data = response.data;
        setWords(data.cloud);
        setCorps(data.corps);
        setMainKeyword(label);
      } catch (error) {
        console.error("호출 실패 :", error);
      }
    }
  };

  const updateChartSize = () => {
    setChartWidth(window.innerWidth * (window.innerWidth >= 768 ? 0.65 : 0.75));
    setFontSize(
      window.innerWidth <= 480 ? 10 : window.innerWidth >= 1080 ? 20 : 15
    );
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
          <div className={styles.cloudTitle}>
            당신이 선택한 키워드는 #{mainKeyword}
          </div>
        ) : (
          <>
            {CloudType === "홈" ? (
              <div className={styles.cloudTitle}>오늘 주목해야 할 키워드</div>
            ) : (
              <div className={styles.cloudTitle}>기업 키워드</div>
            )}
          </>
        )}
      
      <BubbleChart
        bubbleClickFun={bubbleClick}
        graph={{
          zoom: 1,
        }}
        padding={-2.5}
        data={words}
        width={chartWidth}
        height={chartWidth}
        showLegend={false}
        labelFont={{
          size: fontSize,
          color: "#fff",
          weight: "light",
        }}
        valueFont={{
          size: 0,
        }}
      />
      </div>
    </>
  );
};

export default CustomBubbleChart;
