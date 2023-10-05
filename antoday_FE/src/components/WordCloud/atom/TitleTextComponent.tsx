import React from "react";
import styles from "./TitleTextComponent.module.css";

const TitleTextComponent: React.FC = () => {
  const getCurrentDate = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${dayOfWeek}요일`;
  };

  return (
    <div className={styles.titleTextContainer}>
      <div className={styles.title}>{getCurrentDate()}</div>
      {/* <div className = {styles.text}>오늘 주목해야 할 키워드</div> */}
    </div>
  );
};

export default TitleTextComponent;
