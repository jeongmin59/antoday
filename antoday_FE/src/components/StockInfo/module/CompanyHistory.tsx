import styles from "./CompanyHistory.module.css";

const CompanyHistory = ({ corpHistory }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>최근 소식</div>
      <ul>
        {corpHistory.map((item: any, index: number) => (
          <li key={index}>
            <span className={styles.date}>{Object.keys(item)[0]}</span>
            <span className={styles.content}>{Object.values(item)[0]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyHistory;
