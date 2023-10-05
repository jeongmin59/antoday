import React, { useEffect } from "react";
import styles from "./StockWordCloud.module.css";
import HomeKeyWords from "../../WordCloud/module/HomeKeyWords";
import CustomBubbleChart from "../../WordCloud/template/CustomBubbleChart";
import axios from "axios";
import { useQuery } from "react-query";

interface WordCloudData {
  label: string;
  value: number;
}

interface StockWordCloudProps {
  corpIntro: stockIntro;
}

const StockWordCloud: React.FC<StockWordCloudProps> = ({ corpIntro }) => {
  const corpName = corpIntro.corp_name;

  const getWordCloudData = async () => {
    const response = await axios.get<WordCloudData[]>(
      import.meta.env.VITE_DATA_API_URL + `/keyword/corp/${corpName}`
    );

    return response.data;
  };

  const { data, isLoading } = useQuery("wordCloudData", getWordCloudData);

  return (
    <div className={styles.stockWordsContainer}>
      <div className={styles.title}>{corpName} 워드클라우드</div>
      <CustomBubbleChart data={data} />
    </div>
  );
};

export default StockWordCloud;
