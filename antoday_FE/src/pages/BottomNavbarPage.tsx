import React from 'react';
import NavbarSquare from '../components/BottomNavbar/organisms/NavbarSquare';
import styles from './BottomNavbarPage.module.css';


function BottomNavbarPage() {

    return (
        <div className={styles['navigationbar_bottom']}>
            <NavbarSquare /> 
        </div>
    );
}

export default BottomNavbarPage;