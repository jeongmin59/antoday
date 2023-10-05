import axios from "axios";
import { AntDefault } from "../../../assets/img/ant";
import styles from "./AiFeedback.module.css";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../Common/atom/LoadingSpinner";

const AiFeedback: React.FC<TradingRecord> = ({
  corpName,
  tradeAt,
  optionBuySell,
  price,
  cnt,
  keywordList,
  reason,
  aiAnalyze,
  stockCode,
}) => {
  const { tradePk } = useParams();
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAiFeedback = async (tradePk: string | undefined) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_DATA_API_URL + `/trade/analyze`,
        {
          tradePk: tradePk,
          corpName: corpName,
          stockCode: stockCode,
          optionBuySell: optionBuySell,
          price: price,
          cnt: cnt,
          tradeAt: tradeAt,
          reason: reason,
          keyword: keywordList,
        }
      );
      console.log("AI 결과분석 fetch함수안일때", response.data);
      setResults(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(true);
      throw new Error("AI 결과분석 실패");
    } finally {
      window.location.reload();
    }
  };

  const handleClick = () => {
    console.log("핸들클릭 실행됨");
    setIsLoading(true);
    fetchAiFeedback(tradePk);
  };

  useEffect(() => {}, [results]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>AI피드백</div>
      <div className={styles.content}>
        {isLoading ? (
          <div>
            <img className={styles.antimage} src={AntDefault} alt="개미" />
            <div className={styles.feedback}>
              <LoadingSpinner />
            </div>
          </div>
        ) : isError ? (
          <div>
            <img
              className={styles.antbutton}
              onClick={handleClick}
              src={AntDefault}
              alt="개미"
            />
            <div className={styles.feedback}>
              피드백을 불러오는 도중 오류가 발생했습니다.
            </div>
          </div>
        ) : (
          <div>
            <img
              className={styles.antbutton}
              src={AntDefault}
              alt="개미"
              onClick={handleClick}
            />
            <div className={styles.feedback}>
              개미를 눌러 피드백을 받아보세요
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiFeedback;
