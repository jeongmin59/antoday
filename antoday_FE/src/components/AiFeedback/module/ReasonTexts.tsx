import styles from './ReasonTexts.module.css'

const ReasonTexts : React.FC<TradingRecord> = ({reason}) => {
  return ( 
    <div>
      <div className={styles.title}>매수/매도 이유</div>
      <div className={styles.content}>{reason}</div>
    </div>
   );
}
 
export default ReasonTexts;