import React from "react";
import ReactWordcloud from "react-wordcloud";
import { WordExam } from "../../../assets/img/ant";
import styles from "./HomeKeyWords.module.css";

const HomeKeyWords: React.FC = () => {
  // 워드 클라우드에 표시할 데이터 예시
  const words = [
    { text: "경제", value: 50, color: "red" }, // 텍스트와 해당 텍스트의 빈도수(value)를 지정
    { text: "코로나", value: 50 },
    { text: "마리화나", value: 50 },
    { text: "아이폰", value: 50 },
    { text: "금융", value: 30 },
    { text: "투자", value: 25 },
    { text: "주식", value: 20 },
    { text: "증권", value: 18 },
    { text: "거래", value: 17 },
    { text: "금리", value: 16 },
    { text: "환율", value: 15 },
    { text: "증시", value: 14 },
    { text: "포트폴리오", value: 13 },
    { text: "수익률", value: 12 },
    { text: "자산", value: 11 },
    { text: "경기", value: 10 },
    { text: "산업", value: 9 },
    { text: "외환", value: 8 },
    { text: "수출", value: 7 },
    { text: "소비자", value: 6 },
    { text: "생산", value: 5 },
    { text: "물가", value: 4 },
    { text: "통화", value: 3 },
  ];

  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
  };
  return (
    <div>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
};

export default HomeKeyWords;
