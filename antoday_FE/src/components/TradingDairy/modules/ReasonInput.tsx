import React, { useState, ChangeEvent } from 'react';
import styles from '../template/CheckTradingRecord.module.css';

const ReasonInput: React.FC = () => {
  const [record, setRecord] = useState<string>('');

  const handleRecordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRecord(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={styles.pageTitle}>매수/매도 이유 (선택)</div>
      <div className={styles.recordContainer}>
        <textarea
          value={record}
          onChange={handleRecordChange}
          placeholder="이유를 입력해주세요."
          rows={5} // 행 수
          cols={40} // 열 수
          style={{border: 'none', 
          height: '80%', 
          width: '90%'}}
        />
      </div>
    </React.Fragment>
  );
};

export default ReasonInput;