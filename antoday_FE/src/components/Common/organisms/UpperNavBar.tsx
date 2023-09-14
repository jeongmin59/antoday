import React, { useState } from 'react';
import styles from './UpperNavBar.module.css'
import { Link } from 'react-router-dom';
import { logoDefaultWhite } from '../../../assets/img/logo';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../../recoil/auth';


const UpperNavBar : React.FC = () => {
  const [isLog,setIsLog] = useState<boolean>(false);
  const [token,setToken] = useRecoilState(accessToken);

  const handleLogout = () => {
    setToken('')
  }

  return (
    <nav className={styles.navigation}>
      <Link to='/' className={styles.navItemHome}>
        <img src ={logoDefaultWhite} alt="LogoImage" style={{width:'200px'}}/>
      </Link>
      <Link to='/companysearch' className={styles.navItemCompanyInfo}>종목정보</Link>
      <Link to='/tradingrecord' className={styles.navItemTradingRecord}>매매일지</Link>
      {token ? (<span onClick={handleLogout}>로그아웃</span>) : (<Link to='/login' className={styles.navItemLogin}>로그인</Link>)}
    </nav>
  );
}

export default UpperNavBar;