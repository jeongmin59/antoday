import React, { useState, useEffect } from 'react';
import styles from './Memo.module.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../../recoil/auth';

interface MemoProps {
  className?: string; // className 속성을 받을 수 있도록 정의
}

const Memo: React.FC<MemoProps> = () => {
  
  const [memoText, setMemoText] = useState('');
  const token = useRecoilValue(accessTokenAtom);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
        console.error('메모 가져오기 에러', error);
      }
    };

    getMemo();

    return () => {
      setMemoText('');
    };
  }, [token]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMemoText = e.target.value;
    setMemoText(newMemoText);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      handleUpdateMemo();
    }, 1500);

    setTimeoutId(newTimeoutId);
  };

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
      console.log('메모가 성공적으로 수정되었습니다');
    } catch (error) {
      console.error('메모 수정이 실패하였습니다', error);
    }
  };

  return (
          <textarea
            rows={5}
            cols={30}
            value={memoText}
            onChange={handleMemoChange}
            className={styles.textArea}
          />
  );
};

export default Memo;
