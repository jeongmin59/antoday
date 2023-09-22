import React from 'react';
import KospiKosdakIndex from '../../Main/module/KospiKosdakIndex';
import HotCompany from '../module/HotCompany';
import ColdCompany from '../module/ColdCompany';
import styles from './HomeWordCloud.module.css'

const HomeBottom : React.FC = () => {
    return ( 
        <React.Fragment>
            <KospiKosdakIndex/>
            <HotCompany />
            <ColdCompany />
        </React.Fragment>
    );
}

export default HomeBottom;