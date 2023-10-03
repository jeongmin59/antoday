import React, {useEffect, useState} from "react";
import { AntDefault, AntMemo, AntSleep, AntWorking } from "../../../assets/img/ant";
import styles from "./HomeHeader.module.css";

const HomeHeader: React.FC = () => {
  const [bgColorClass, setBgColorClass] = useState("");
  const [antImageSrc, setAntImageSrc] = useState("");

  useEffect(() => {
    const checkTimeAndSetClass = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 6 && hours < 10) {
        // am6:00~am10:00
        setBgColorClass(styles.morningBackground);
        setAntImageSrc(AntWorking);
      } else if (hours >= 17 && hours < 22) {
        // pm5:00~pm10:00 일 때
        setBgColorClass(styles.nightBackground);
        setAntImageSrc(AntSleep);
      } else {
        // 그 외의 경우
        setBgColorClass(styles.defaultBackground);
        setAntImageSrc(AntMemo);
      }
    };

    checkTimeAndSetClass(); // 페이지 로드 시 배경색 클래스 설정

    // 1분마다 현재 시간을 확인하고 클래스 업데이트
    const intervalId = setInterval(checkTimeAndSetClass, 60000);

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, []);

  const handleMorningClick = () => {
    setBgColorClass(styles.morningBackground);
    setAntImageSrc(AntWorking);
  };

  const handleDayClick = () => {
    setBgColorClass(styles.dayBackground);
    setAntImageSrc(AntMemo);
  };

  const handleNightClick = () => {
    setBgColorClass(styles.nightBackground);
    setAntImageSrc(AntSleep);
  };

  return (
  <div>
    <div className={`${styles.headerContainer} ${bgColorClass}`}>
      <div className={styles.headerText}>
        오늘의 키워드를 눌러<br />
        이슈와 관련된 기업을
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
    <div>
    <button onClick={handleMorningClick}>아침</button>
    <button onClick={handleDayClick}>낮</button>
    <button onClick={handleNightClick}>밤</button>
  </div>
  </div>
  );
};

export default HomeHeader;
