import React from 'react';
import styles from './UpperNavBar.module.css'
import { Link } from 'react-router-dom';
import { logoDefaultWhite } from '../../../assets/img';

const UpperNavBar : React.FC = () => {

  return (
    <nav className={styles.navigation}>
      <Link to='/' className={styles.navItemHome}>
        <img src ={logoDefaultWhite} alt="LogoImage" style={{width:'200px'}}/>
      </Link>
      <Link to='/companysearch' className={styles.navItemCompanyInfo}>기업정보</Link>
      <Link to='/tradingrecord' className={styles.navItemTradingRecord}>매매일지</Link>
    </nav>
  );
}

export default UpperNavBar;