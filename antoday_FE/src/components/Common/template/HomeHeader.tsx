import React, { useEffect, useState } from "react";
import { AntMemo, AntSleep, AntWorking } from "../../../assets/img/ant";
import styles from "./HomeHeader.module.css";

const HomeHeader: React.FC = () => {
  const [bgColorClass, setBgColorClass] = useState(styles.morningBackground);
  const [antImageSrc, setAntImageSrc] = useState(AntWorking);

  // useEffect(() => {
  //   const checkTimeAndSetClass = () => {
  //     const now = new Date();
  //     // console.log("시간", now);
  //     const hours = now.getHours();

  //     if (hours >= 9 && hours < 15) {
  //       // am9:00~pm03:00
  //       setBgColorClass(styles.morningBackground);
  //       setAntImageSrc(AntWorking);
  //     } else if (hours >= 21 || hours < 6) {
  //       // pm9:00~am6:00 일 때
  //       setBgColorClass(styles.nightBackground);
  //       setAntImageSrc(AntSleep);
  //     } else {
  //       // 그 외의 경우
  //       setBgColorClass(styles.defaultBackground);
  //       setAntImageSrc(AntMemo);
  //     }
  //   };

  //   checkTimeAndSetClass(); // 페이지 로드 시 배경색 클래스 설정

  //   // 1분마다 현재 시간을 확인하고 클래스 업데이트
  //   const intervalId = setInterval(checkTimeAndSetClass, 60000);

  //   return () => {
  //     clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  //   };
  // }, []);

  const handleMorningClick = () => {
    setBgColorClass(styles.morningBackground);
    setAntImageSrc(AntMemo);
  };

  const handleDayClick = () => {
    setBgColorClass(styles.dayBackground);
    setAntImageSrc(AntWorking);
  };

  const handleNightClick = () => {
    setBgColorClass(styles.nightBackground);
    setAntImageSrc(AntSleep);
  };

  return (
    <div>
      <div className={`${styles.headerContainer} ${bgColorClass}`}>
        <div className={styles.headerText}>
          키워드를 눌러
          <br />
          오늘의 이슈와
          <br />
          관련된 기업을
          <br />
          확인해보세요
          <br />
        </div>
        <div className={styles.headerImage}>
          <img
            className={styles.AntImage}
            src={antImageSrc}
            alt="개미이미지"
          ></img>
        </div>
      </div>
      {/* <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleMorningClick}>
          working
        </button>
        <button className={styles.button} onClick={handleDayClick}>
          day
        </button>
        <button className={styles.button} onClick={handleNightClick}>
          night
        </button>
      </div> */}
    </div>
  );
};

export default HomeHeader;
