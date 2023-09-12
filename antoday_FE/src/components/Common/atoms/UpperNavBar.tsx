import React from 'react';
import styles from './UpperNavBar.module.css'
import { Link } from 'react-router-dom';

const UpperNavBar = () => {
  return (
    <nav className={styles.navigation}>
      <Link to='/' className={styles.navItem}>홈화면</Link>
      <Link to='/companysearch' className={styles.navItem}>기업정보</Link>
      <Link to='/tradingrecord' className={styles.navItem}>매매일지</Link>
    </nav>
  );
}

export default UpperNavBar;