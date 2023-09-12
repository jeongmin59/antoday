import React from 'react';
import Companyinfo from '../atoms/Companyinfo';
import TradeHistory from '../atoms/TradeHistory';
import Home from '../atoms/Home';
import styles from './NavbarSquare.module.css';

const NavbarSquare = () => {
    return (
        <div className={styles['square_bottom']}>
            <div className={styles['square_bottom_inner']}>
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
        </div>
    );
}

export default NavbarSquare;


