import { useRecoilState } from "recoil";
import { userNameAtom } from "../../recoil/user";
import styles from "./HomePage.module.css";
import HomeWordCloud from "../../components/WordCloud/template/HomeWordCloud";
import HomeHeader from "../../components/Common/template/HomeHeader";

const HomePage = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);

  return (
    <div className={styles.mainContainer}>
      <HomeHeader />
      <HomeWordCloud />
    </div>
  );
};

export default HomePage;
