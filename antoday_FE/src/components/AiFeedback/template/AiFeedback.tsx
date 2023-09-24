import axios from 'axios';
import { AntDefault } from '../../../assets/img/ant';
import styles from './AiFeedback.module.css'
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

interface AiFeedbackProps {
  aiAnalyze : string | null;
}

const fetchAiFeedback = async (tradePk: string|undefined) => {
  try {
    const response = await axios.patch(import.meta.env.VITE_BACK_API_URL +
      `/api/trade/${tradePk}`);
      console.log('AI 결과분석 완료');
    return response.data;
  } catch (error) {
    throw new Error('AI 결과분석 실패');
  }
};

const AiFeedback : React.FC<AiFeedbackProps> = ({aiAnalyze}) => {
  const { tradePk } = useParams();
  const queryClient = useQueryClient();

  const { data : aiFeedback, isLoading, isError } = useQuery('aiFeedback',
  () => fetchAiFeedback(tradePk)
  , {
    enabled: false, 
  });

  const handleClick = () => {
    // 버튼 클릭 시 useQuery 활성화
    queryClient.refetchQueries('aiFeedback'); // queryClient는 React Query의 QueryClient 인스턴스여야 함
  };

  return ( 
    <div className={styles.mainContainer}>
      <div className={styles.title}>AI피드백</div>
      <div className={styles.content}>
        {aiAnalyze !== null ? (
          <>
          <img className={styles.antimage} src={AntDefault} alt='개미' />
          <div className={styles.feedback}>{aiAnalyze}</div>
          </>
        ) : (
          <>
            {isLoading ? (
              <>
              <img className={styles.antbutton} src={AntDefault} alt='개미' onClick={handleClick} />
              <div className={styles.feedback}>로딩 중...</div>
              </>
            ) : isError ? (
              <>
              <img className={styles.antbutton} src={AntDefault} alt='개미' onClick={handleClick} />
              <div className={styles.feedback}>피드백을 불러오는 도중 오류가 발생했습니다.</div>
              </>
            ) : (
              <>
              <img className={styles.antimage} src={AntDefault} alt='개미'/>
              <div className={styles.feedback}>{aiFeedback}</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AiFeedback;