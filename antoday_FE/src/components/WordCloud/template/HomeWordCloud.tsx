import React from 'react';
import TitleTextComponent from '../atoms/TitleTextComponent';
import HomeKeyWords from '../modules/HomeKeyWords';
import HomeKeyWordsCompanys from '../modules/HomeKeyWordsCompanys';
import KospiKosdakIndex from '../modules/KospiKosdakIndex';
import styles from './HomeWordCloud.module.css'

const HomeWordCloud : React.FC = () => {
    return ( 
        <React.Fragment>
            <TitleTextComponent/>
            <HomeKeyWords/>
            <HomeKeyWordsCompanys/>
            <KospiKosdakIndex/>
        </React.Fragment>
    );
}

export default HomeWordCloud;