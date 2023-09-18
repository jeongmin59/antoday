import { useRecoilState } from "recoil";
import { userNameAtom } from "../recoil/user";
import styles from './HomePage.module.css'
import HomeWordCloud from "../components/WordCloud/templates/HomeWordCloud";
import HomeHeader from "../components/Common/templates/HomeHeader";

const HomePage = () => {
    const [userName,setUserName]  = useRecoilState(userNameAtom);

    return ( 
      <div className={styles.mainContainer}>
        <HomeHeader/>
        <HomeWordCloud/>
      </div >
    );
}

export default HomePage;