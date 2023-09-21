import React from 'react';
// import { useLocation } from 'react-router';
// import styles from './WriteTradingRecordPage.module.css'
import KeywordInput from '../modules/KeywordInput';
import ReasonInput from '../modules/ReasonInput';
import SaveBtn from '../atoms/SaveBtn';

const InputConfirm = () => {

  return (
    <React.Fragment>
      <KeywordInput />
      <ReasonInput />
      <SaveBtn />
    </React.Fragment>
  );
};

export default InputConfirm;
