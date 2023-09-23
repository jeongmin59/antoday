import React from 'react';
import KospiKosdakIndex from '../../Main/module/KospiKosdakIndex';
import HotCompany from '../module/HotCompany';
import ColdCompany from '../module/ColdCompany';
import styles from './HomeBottom.module.css'
import TodayNews from '../module/TodayNews';

const HomeBottom : React.FC = () => {
    return ( 
      <React.Fragment>
        <div className={styles.container}>
          <KospiKosdakIndex/>
          <HotCompany />
          <ColdCompany />
          <TodayNews />
        </div>
      </React.Fragment>
    );
}

export default HomeBottom;