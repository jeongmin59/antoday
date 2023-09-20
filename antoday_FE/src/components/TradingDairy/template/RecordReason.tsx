import React, { useState, ChangeEvent } from 'react';
import styles from './CheckTradingRecord.module.css';

const RecordReason: React.FC = () => {
  const [record, setRecord] = useState<string>('');

  const handleRecordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRecord(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={styles.pageTitle}>매수/매도 이유</div>
      <div className={styles.recordContainer}>
        <textarea
          value={record}
          onChange={handleRecordChange}
          placeholder="매매 이유 입력하세요"
          rows={5} // 원하는 행 수
          cols={40} // 원하는 열 수
        />
      </div>
    </React.Fragment>
  );
};

export default RecordReason;