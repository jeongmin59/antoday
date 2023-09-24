import AiFeedback from '../../components/AiFeedback/template/AiFeedback';
import ReadingTrade from '../../components/AiFeedback/template/ReadingTrade';
import styles from './TradingRecordDetailPage.module.css'

const TradingRecordDetailPage = () => {
  return (
  <div className={styles.mainContainer}>
     <div className={styles.leftContainer}>
     <ReadingTrade/>
     </div>
     <div className={styles.rightContainer}>
     <AiFeedback  />
     </div>
  </div>
  );
};

export default TradingRecordDetailPage;
