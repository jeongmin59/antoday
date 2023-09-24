import styles from './BottomNavbar.module.css';
import BottomIcon from '../atom/BottomIcon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const BottomNavbar = () => {

    return (
        <div className={styles['bottomNavwrap']}>
            <div className={styles['square_bottom_item']}>
                <BottomIcon icon={faNewspaper} text='Stock' url='/stocksearch'/>
            </div>
            <div className={styles['square_bottom_item']}>
                <BottomIcon icon={faHouse} text='Home' url='/'/>
            </div>
            <div className={styles['square_bottom_item']}>
                <BottomIcon icon={faUser} text='record' url='/tradingrecord'/>
            </div>
        </div>
    );
}

export default BottomNavbar;