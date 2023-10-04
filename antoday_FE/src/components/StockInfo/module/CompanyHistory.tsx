import styles from "./CompanyHistory.module.css";

const CompanyHistory = ({ corpHistory }) => {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.historyList}>
        {corpHistory.map((item: any, index: number) => (
          <li key={index} className={styles.historyItem}>
            <span className={styles.date}>{Object.keys(item)[0]}</span>
            <span className={styles.content}>{Object.values(item)[0]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyHistory;
