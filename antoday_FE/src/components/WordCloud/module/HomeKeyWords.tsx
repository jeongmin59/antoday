import React, { useEffect, useState } from "react";
import styles from './HomeKeyWords.module.css'
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import HomeKeyWordsCompany from "../atom/HomeKeyWordsCompany";

interface WordCloudData {
  label: string;
  value: number;
}

const HomeKeyWords: React.FC = () => {
  // 워드 클라우드에 표시할 데이터 예시
  const [words, setWords] = useState<WordCloudData[]>([]);
  const [corps, setCorps] = useState(null);

  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);

  const updateChartSize = () => {
    setChartWidth(window.innerWidth * 0.8);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateChartSize);
    getWordCloudData();
    return () => {
      window.removeEventListener("resize", updateChartSize);
    };
  }, []);


  const getWordCloudData = async () => {
    try {
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + '/keyword'
        );
        const data = response.data;
        setWords(data.cloud);
        setCorps(data.corps);
    } catch (error) {
      console.error("호출 실패 :" , error);
    }
  };

  const options = {
    rotations: 1,
    rotationAngles: [0, 90],
  };

  console.log('기업정보 5개 담긴 배열', corps)
  return (
    <div>
      {/* <ReactWordcloud words={words} options={options}/> */}
      <BubbleChart
        data={words.slice(0,20)}
        width={chartWidth} 
        height={700} 
      />
      <HomeKeyWordsCompany/>
    </div>
  );
};

export default HomeKeyWords;
