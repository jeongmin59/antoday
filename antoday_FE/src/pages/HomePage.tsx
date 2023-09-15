import { useRecoilState } from "recoil";
import { userNameAtom } from "../recoil/user";
import styles from './HomePage.module.css'
import HomeWordCloud from "../components/WordCloud/templates/HomeWordCloud";

const HomePage = () => {
    const [userName,setUserName]  = useRecoilState(userNameAtom);

    return ( 
        <div className={styles.mainContainer}>
        <HomeWordCloud/>
        </div >
    );
}

export default HomePage;