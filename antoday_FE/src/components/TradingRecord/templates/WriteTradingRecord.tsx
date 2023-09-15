import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './WriteTradingRecord.module.css';

interface WriteTradingRecordPageProps {
    closeWritePage: () => void;
  }

const WriteTradingRecordPage: React.FC<WriteTradingRecordPageProps> = ({ closeWritePage }) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [selectedOption, setSelectedOption] = useState<string>('');
    const someData = "I am some data from B";

    const gotowritetradingrecord = () => {
        navigate('/writetradingrecord', { state: { tradingdata: someData } });
      };
    
    const handleButtonClick = () => {
    closeWritePage();  
    gotowritetradingrecord();  
    };

    const handleClick = (option: string) => {
        setSelectedOption(option);
      };

    return <div>
       <div className={styles.horizontal}>
        <p>날짜</p>
        <DatePicker 
        selected={selectedDate} 
        onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
      />
      <button 
        className={ `${selectedOption === '매수' ? styles.bold : styles.normal} ${styles.button}`}
        onClick={() => handleClick('매수')}
      >
        매수
      </button>
      <button 
        className={`${selectedOption === '매도' ? styles.bold : styles.normal} ${styles.button}`}
        onClick={() => handleClick('매도')}
      >
        매도
      </button>
      </div> 
      <div>
        <div className={styles.horizontal}>
            <div>삼성전자</div>
            <div>5주</div>
        </div>
        <div className={styles.horizontal}>
            <div>평단가</div>
            <div>70100원</div>
        </div>
      </div>
        <button onClick={closeWritePage}>취소</button>
        <button onClick={handleButtonClick}>추가</button>
    </div>
};

export default WriteTradingRecordPage;