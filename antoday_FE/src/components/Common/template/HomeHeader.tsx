import React from "react";
import { AntDefault } from "../../../assets/img/ant";
import styles from "./HomeHeader.module.css";

const HomeHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>
        오늘의 키워드를 눌러
        <br />
        이슈와 관련된 기업을
        <br />
        확인해보세요
        <br />
      </div>
      <div className={styles.headerImage}>
        <img
          className={styles.AntImage}
          src={AntDefault}
          alt="개미이미지"
        ></img>
      </div>
    </div>
  );
};

export default HomeHeader;
