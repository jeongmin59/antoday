import React, { useEffect, useState } from "react";
import styles from "./HomeKeyWords.module.css";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import HomeKeyWordsCompany from "../atom/HomeKeyWordsCompany";
import { loading } from "../../../assets/img/common";
import CustomBubbleChart from "../template/CustomBubbleChart";
import { useRecoilState } from "recoil";
import { corpDataAtom, wordDataAtom } from "../../../recoil/wordCloud";

interface WordCloudData {
  label: string;
  value: number;
}

const HomeKeyWords: React.FC = () => {
  // const [words, setWords] = useState<WordCloudData[]>([]);
  // const [corps, setCorps] = useState(null);
  const [words, setWords] = useRecoilState(wordDataAtom);
  const [corps, setCorps] = useRecoilState(corpDataAtom);
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.75);
  const [mainKeyword, setMainKeyword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [CloudType, setCloudType] = useState<string>("홈");

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

  const getWordCloudData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + "/keyword"
      );
      const data = response.data;
      setWords(data.cloud);
      setCorps(data.corps);
      console.log("호출");
    } catch (error) {
      console.error("호출 실패 :", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("기업정보 5개 담긴 배열", corps);

  if (isLoading) {
    return (
      <div className={styles.center}>
        <img src={loading} alt="" height={"150rem"} width={"150rem"} />
      </div>
    );
  }

  console.log("ghkrdls", corps);

  return (
    <div>
      <div className={styles.bubbleChartContainer}>
        <CustomBubbleChart data={words} CloudType={CloudType} />
      </div>
      <div className={styles.corpListContainer}>
        <HomeKeyWordsCompany />
      </div>
    </div>
  );
};

export default HomeKeyWords;
