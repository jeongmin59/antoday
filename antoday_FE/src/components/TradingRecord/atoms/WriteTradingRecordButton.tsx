// import {Link} from 'react-router-dom';
import styles from './WriteTradingRecordButton.module.css';

interface WriteTradingRecordButtonProps {
    onClick: () => void;
  }

  const WriteTradingRecordButton: React.FC<WriteTradingRecordButtonProps> = ({ onClick }) => {
    return (
      <button onClick={onClick} className={styles.button}>
       <p>매매 이유 작성하기</p>
      </button>
    );
  };

export default WriteTradingRecordButton;