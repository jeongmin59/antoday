import React from 'react';
import KospiKosdakIndex from '../../Main/module/KospiKosdakIndex';
import HotCompany from '../module/HotCompany';
import ColdCompany from '../module/ColdCompany';
import styles from './HomeWordCloud.module.css'
import TodayNews from '../module/TodayNews';

const HomeBottom : React.FC = () => {
    return ( 
        <React.Fragment>
            <KospiKosdakIndex/>
            <HotCompany />
            <ColdCompany />
            <TodayNews />
        </React.Fragment>
    );
}

export default HomeBottom;