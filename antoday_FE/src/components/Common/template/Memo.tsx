import React, { useState, useEffect } from 'react';
import styles from './Memo.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { accessTokenAtom } from '../../../recoil/auth';

interface MemoProps {
  onClose: () => void;
  isMemoVisible: boolean;
}

const Memo: React.FC<MemoProps> = ({ onClose, isMemoVisible }) => {
  const [memoText, setMemoText] = useState('');
  const [token, setToken] = useRecoilState(accessTokenAtom);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_API_URL}/api/memo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMemoText(response.data.memo);
      } catch (error) {
        console.error('에러', error);
      }
    };

    getMemo();

    return () => {
      setMemoText('');
    };
  }, [token]);

  const handleUpdateMemo = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACK_API_URL}/api/memo?memo=${encodeURIComponent(memoText)}`,
        { memo: memoText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('메모 수정');
      onClose();
    } catch (error) {
      console.error('에러', error);
    }
  };

  return (
    <div className={` ${isMemoVisible ? styles.active : ''}`} onClick={onClose}>
      <div className={`${styles.memo} `} onClick={(e) => e.stopPropagation()}>
        <div className={styles.memoContent}>
          <button onClick={handleUpdateMemo}>X</button>
          <textarea
            rows={5}
            cols={30}
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Memo;
