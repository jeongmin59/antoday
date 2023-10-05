import { AntDefault } from "../../../assets/img/ant";
import styles from "./ShowFeedback.module.css";

interface ShowFeedbackProps {
  aiAnalyze: string;
}

const ShowFeedback: React.FC<ShowFeedbackProps> = ({ aiAnalyze }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>AI피드백</div>
      <div className={styles.content}>
        <div className={styles.subcontainer}>
          <img className={styles.antimage} src={AntDefault} alt="개미" />
          <div className={styles.feedback}>{aiAnalyze}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedback;
