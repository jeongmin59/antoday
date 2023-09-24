import { useNavigate } from "react-router";
import styles from './SkipBtn.module.css'

const SkipBtn : React.FC = () => {
  const navigator = useNavigate();
  const handleSkip = () => {
    navigator('/tradingrecord')
  }

  return ( 
      <button onClick={handleSkip} className={styles.button}>건너뛰기</button>
   );
}
 
export default SkipBtn;