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
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.75);
  const [mainKeyword, setMainKeyword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateChartSize = () => {
    setChartWidth(window.innerWidth * 0.75);
  };
  

  useEffect(() => {
    window.addEventListener("resize", updateChartSize);
    getWordCloudData();
    return () => {
      window.removeEventListener("resize", updateChartSize);
    };
  }, []);

  const bubbleClick = async (label:string) =>{
    console.log(label, "클릭");
    try {
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + '/keyword/' + label
        );
        const data = response.data;
        setWords(data.cloud);
        setCorps(data.corps);
        setMainKeyword(label);
        console.log("클릭호출")
    } catch (error) {
      console.error("호출 실패 :" , error);
    }
  }
  const getWordCloudData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + '/keyword'
        );
        const data = response.data;
        setWords(data.cloud);
        setCorps(data.corps);
        console.log("호출")
    } catch (error) {
      console.error("호출 실패 :" , error);
    } finally {
      setIsLoading(false)
    }
  };
  console.log('기업정보 5개 담긴 배열', corps)

  if (isLoading) {
    return (
      <img src={loading} alt="" height={'150px'}/>
    );
  }
  return (
    <div>
      <div className={styles.bubbleChartContainer}>
      <div>
        {mainKeyword !== null ? (
          <p className={styles.keywordTag}>#{mainKeyword} 관련 키워드</p>
        ) : null}
      </div>
        <BubbleChart
          bubbleClickFun={bubbleClick}
          graph= {{
            zoom: 0.9,
          }}
          padding={10}
          data={words}
          width={chartWidth} 
          height={chartWidth} 
          showLegend={false}
          labelFont={{
            size: 15,
            color: '#fff',
            weight: 'light',
          }}
          valueFont={{
            size: 0,
          }}
        />
      </div>
      <HomeKeyWordsCompany/>
    </div>
  );
};

export default HomeKeyWords;
