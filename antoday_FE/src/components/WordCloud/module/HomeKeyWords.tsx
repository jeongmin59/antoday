import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import { WordExam } from "../../../assets/img/ant";
import styles from "./HomeKeyWords.module.css";
import axios from "axios";

interface WordCloudData {
  text: string;
  value: number;
}

const HomeKeyWords: React.FC = () => {
  // 워드 클라우드에 표시할 데이터 예시
  const [words, setWords] = useState<WordCloudData[]>([]);
  
  useEffect(() => {
    getWordCloudData();
  }, []);


  const getWordCloudData = async () => {
    try {
      const response = await axios.get<WordCloudData[]>(
        import.meta.env.VITE_DATA_API_URL + '/keyword'
        );
        const data = response.data;
        setWords(data);
    } catch (error) {
      console.error("호출 실패 :" , error);
    }
  };

  const options = {
    rotations: 1,
    rotationAngles: [0, 90],
  };

  return (
    <div>
      <ReactWordcloud words={words} options={options}/>
    </div>
  );
};

export default HomeKeyWords;
