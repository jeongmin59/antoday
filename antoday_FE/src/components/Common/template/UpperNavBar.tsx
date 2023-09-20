import React, { useState } from 'react';
import styles from './UpperNavBar.module.css'
import { Link } from 'react-router-dom';
import { logoDefaultWhite } from '../../../assets/img/logo';
import { useRecoilState } from 'recoil';
import { accessTokenAtom } from '../../../recoil/auth';
import { userNameAtom } from '../../../recoil/user';


const UpperNavBar : React.FC = () => {
  const [token,setToken] = useRecoilState(accessTokenAtom);
  const [userName,setUserName] = useRecoilState(userNameAtom);
  const handleLogout = () => {
    setToken('')
  }

  return (
    <nav className={styles.navigation}>
      <Link to='/' className={styles.navItemHome}>
        <img src ={logoDefaultWhite} alt="LogoImage" style={{width:'200px'}}/>
      </Link>
      <Link to='/stocksearch' className={styles.navItemCompanyInfo}>종목정보</Link>
      <Link to='/tradingrecord' className={styles.navItemTradingRecord}>매매일지</Link>
      {token ? (<Link to='/' className={styles.navItemLogin} onClick={handleLogout}>{userName}님</Link>) : (<Link to='/login' className={styles.navItemLogin}>로그인</Link>)}
    </nav>
  );
}

export default UpperNavBar;