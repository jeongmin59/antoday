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
      내 매매기록 추가하기
    </button>
  );
};

export default WriteTradingRecordButton;
