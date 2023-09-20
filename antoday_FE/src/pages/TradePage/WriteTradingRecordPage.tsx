import React from 'react';
import { useLocation } from 'react-router';


const WriteTradingRecordPage: React.FC = () => {
  // 여기에 글 작성 로직
  const location = useLocation();
  const tradingdata = location.state?.tradingdata;

  return (
    <div>
      <h2>매매 이유 작성 페이지</h2>
      <p>{tradingdata}</p>

      <button>닫기</button>
    </div>
  );
};

export default WriteTradingRecordPage;
