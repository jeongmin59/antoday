import { useRecoilState } from "recoil";
import { userNameAtom } from "../../recoil/user";
import styles from "./HomePage.module.css";
import HomeWordCloud from "../../components/WordCloud/template/HomeWordCloud";
import HomeHeader from "../../components/Common/template/HomeHeader";
import HomeBottom from "../../components/Main/template/HomeBottom";

const HomePage = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);

  return (
    <div className={styles.mainContainer}>
      <HomeHeader />
      <HomeWordCloud />
      <HomeBottom />
    </div>
  );
};

export default HomePage;
