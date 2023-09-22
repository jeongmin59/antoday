import React from 'react';
import TitleTextComponent from '../atom/TitleTextComponent';
import HomeKeyWords from '../module/HomeKeyWords';
import HomeKeyWordsCompanys from '../module/HomeKeyWordsCompanys';
import styles from './HomeWordCloud.module.css'

const HomeWordCloud : React.FC = () => {
    return ( 
        <React.Fragment>
            <TitleTextComponent/>
            <HomeKeyWords/>
            <HomeKeyWordsCompanys/>
        </React.Fragment>
    );
}

export default HomeWordCloud;