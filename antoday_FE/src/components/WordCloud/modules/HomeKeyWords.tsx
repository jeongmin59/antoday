import { WordExam } from '../../../assets/img/ant';
import styles from './HomeKeyWords.module.css'


const HomeKeyWords = () => {
    return ( 
        <div >
        <img className={styles.WordContainer} src={WordExam} alt='워드클라우드이미지' />
        </div>
    );
}

export default HomeKeyWords;