import React, { useEffect, useState } from "react";
import styles from './HomeKeyWords.module.css'
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import HomeKeyWordsCompany from "../atom/HomeKeyWordsCompany";
import { loading } from "../../../assets/img/common";

interface WordCloudData {
  label: string;
  value: number;
}

const HomeKeyWords: React.FC = () => {
  // 워드 클라우드에 표시할 데이터 예시
  const [words, setWords] = useState<WordCloudData[]>([]);
  const [corps, setCorps] = useState(null);
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + '/keyword'
        );
        const data = response.data;
        setWords(data.cloud);
        setCorps(data.corps);
    } catch (error) {
      console.error("호출 실패 :" , error);
    } finally {
      setIsLoading(false)
    }
  };
0
  console.log('기업정보 5개 담긴 배열', corps)

  if (isLoading) {
    return (
      <img src={loading} alt="" height={'150px'}/>
    );
  }
  return (
    <div>
      <BubbleChart
        data={words}
        width={chartWidth} 
        height={700} 
        showLegend={false}
        labelFont={{
          size: 15,
          color: '#fff',
          weight: 'bold',
        }}
        valueFont={{
          size: 0,
        }}
      />
      <HomeKeyWordsCompany/>
    </div>
  );
};

export default HomeKeyWords;
