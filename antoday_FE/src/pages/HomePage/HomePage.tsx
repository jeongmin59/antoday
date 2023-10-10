import styles from "./HomePage.module.css";
import HomeWordCloud from "../../components/WordCloud/template/HomeWordCloud";
import HomeHeader from "../../components/Common/template/HomeHeader";
import HomeBottom from "../../components/Main/template/HomeBottom";
import TopButton from "../../components/Common/atom/TopButton";

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader />
      <HomeWordCloud />
      <HomeBottom />
      <TopButton />
    </div>
  );
};

export default HomePage;
