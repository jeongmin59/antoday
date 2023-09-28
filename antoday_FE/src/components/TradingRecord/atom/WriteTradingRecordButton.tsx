// import {Link} from 'react-router-dom';
import styles from "./WriteTradingRecordButton.module.css";

interface WriteTradingRecordButtonProps {
  onClick: () => void;
}

const WriteTradingRecordButton: React.FC<WriteTradingRecordButtonProps> = ({
  onClick,
}) => {
  return (
    <button onClick={onClick} className={styles.button}>
      이유 쓰고 AI분석 받기
    </button>
  );
};

export default WriteTradingRecordButton;
