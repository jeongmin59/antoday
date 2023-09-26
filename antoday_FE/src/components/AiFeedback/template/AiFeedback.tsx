import axios from "axios";
import { AntDefault } from "../../../assets/img/ant";
import styles from "./AiFeedback.module.css";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface AiFeedbackProps {
  aiAnalyze: string | null;
}

const AiFeedback: React.FC<AiFeedbackProps> = ({ aiAnalyze }) => {
  const { tradePk } = useParams();
  const [results, setResults] = useState(aiAnalyze);
  const queryClient = useQueryClient();

  const fetchAiFeedback = async (tradePk: string | undefined) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`
      );
      console.log("AI 결과분석 완료", response.data);
      setResults(response.data);
      return response.data;
    } catch (error) {
      throw new Error("AI 결과분석 실패");
    }
  };

  const {
    data: aiFeedback,
    isLoading,
    isError,
  } = useQuery("aiFeedback", () => fetchAiFeedback(tradePk), {
    enabled: false,
  });

  const handleClick = () => {
    queryClient.refetchQueries("aiFeedback");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>AI피드백</div>
      <div className={styles.content}>
        {results ? (
          <>
            <img className={styles.antimage} src={AntDefault} alt="개미" />
            <div className={styles.feedback}>{results}</div>
          </>
        ) : (
          <>
            {isLoading ? (
              <>
                <img className={styles.antimage} src={AntDefault} alt="개미" />
                <div className={styles.feedback}>로딩 중...</div>
              </>
            ) : isError ? (
              <>
                <img className={styles.antimage} src={AntDefault} alt="개미" />
                <div className={styles.feedback}>
                  피드백을 불러오는 도중 오류가 발생했습니다.
                </div>
              </>
            ) : (
              <>
                <img
                  className={styles.antbutton}
                  src={AntDefault}
                  alt="개미"
                  onClick={handleClick}
                />
                <div className={styles.feedback}>
                  개미를 눌러 피드백을 받아보세요
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AiFeedback;
