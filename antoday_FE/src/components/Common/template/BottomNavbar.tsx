import React from 'react';
import styles from './BottomNavbar.module.css';
import Companyinfo from '../atoms/Companyinfo';
import Home from '../atoms/Home';
import TradeHistory from '../atoms/TradeHistory';


function BottomNavbar() {

    return (
        <div className={styles['wrap']}>
            <div className={styles['square_bottom_item']}>
                <Companyinfo />
            </div>
            <div className={styles['square_bottom_item']}>
                <Home />
            </div>
            <div className={styles['square_bottom_item']}>
                <TradeHistory />
            </div>
        </div>
    );
}

export default BottomNavbar;