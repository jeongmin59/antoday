import React, { useState } from 'react';
import styles from './UpperNavBar.module.css'
import { Link } from 'react-router-dom';
import { logoDefaultWhite } from '../../../assets/img/logo';


const UpperNavBar : React.FC = () => {
  const [isLog,setIsLog] = useState<boolean>(false);
  return (
    <nav className={styles.navigation}>
      <Link to='/' className={styles.navItemHome}>
        <img src ={logoDefaultWhite} alt="LogoImage" style={{width:'200px'}}/>
      </Link>
      <Link to='/companysearch' className={styles.navItemCompanyInfo}>종목정보</Link>
      <Link to='/tradingrecord' className={styles.navItemTradingRecord}>매매일지</Link>
      {isLog ? (<span>로그아웃</span>) : (<Link to='/login' className={styles.navItemLogin}>로그인</Link>)}
    </nav>
  );
}

export default UpperNavBar;