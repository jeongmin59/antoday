import React from 'react';
import NavbarSquare from '../atoms/NavbarSquare';
import styles from './BottomNavbar.module.css';


function BottomNavbar() {

    return (
        <div className={styles['navigationbar_bottom']}>
            <NavbarSquare /> 
        </div>
    );
}

export default BottomNavbar;