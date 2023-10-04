import styles from "./CompanyHistory.module.css";

const CompanyHistory = ({ corpHistory }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>최근 소식</div>
      <ul>
        {corpHistory.map((item: any, index: number) => (
          <li key={index}>
            <p className={styles.date}>{Object.keys(item)[0]}</p>
            <p className={styles.content}>{Object.values(item)[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyHistory;
