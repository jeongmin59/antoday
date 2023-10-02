import styles from './BottomNavbar.module.css';
import BottomIcon from '../atom/BottomIcon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
// import { useLocation } from 'react-router';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { accessTokenAtom } from '../../../recoil/auth';
import { useRecoilState } from 'recoil';
import Alert from '../atom/Alert';


const BottomNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useRecoilState(accessTokenAtom);

    const handleIconClick = (url) => {
        if (!token && url === '/tradingrecord') {
            <Alert msg = {"로그인이 필요합니다."} />
            navigate('/login');  
            return;
        }
        navigate(url);
    };

    return (
        <div className={styles['bottomNavwrap']}>
            <div className={styles['square_bottom_item']}>
                <BottomIcon icon={faNewspaper} text='Stock' url='/stocksearch' isActive={location.pathname === '/stocksearch' || location.pathname.startsWith('/stockinfo')}/>
            </div>
            <div className={styles['square_bottom_item']}>
                <BottomIcon icon={faHouse} text='Home' url='/' isActive={location.pathname === '/'}/>
            </div>
            <div className={styles['square_bottom_item']} onClick={() => handleIconClick('/tradingrecord')}>
                <BottomIcon icon={faUser} text='record' isActive={location.pathname.startsWith('/tradingrecord')}/>
            </div>
        </div>
    );
}

export default BottomNavbar;