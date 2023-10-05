import React from "react";
import TitleTextComponent from "../atom/TitleTextComponent";
import HomeKeyWords from "../module/HomeKeyWords";
import styles from "./HomeWordCloud.module.css";

const HomeWordCloud: React.FC = () => {
  return (
    <div className={styles.homeWordCloudContainer}>
      <div className={styles.TitleContainer}>
        <TitleTextComponent />
      </div>
      <div className={styles.ContentContainer}>
        <HomeKeyWords />
      </div>
    </div>
  );
};

export default HomeWordCloud;
