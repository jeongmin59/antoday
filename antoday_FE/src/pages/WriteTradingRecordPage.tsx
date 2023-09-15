import React from 'react';
import { useLocation } from 'react-router';


const WriteTradingRecordPage: React.FC = () => {
  // 여기에 글 작성 로직을 넣을 수 있어요. 예를 들면, useState로 상태 관리를 할 수 있겠죠.
  const location = useLocation();
  const tradingdata = location.state?.tradingdata;

  return (
    <div>
      <h2>매매 이유 작성 페이지</h2>
      <p>{tradingdata}</p>

      <button>닫기</button> {/* 닫기 버튼. 이 버튼을 누르면 페이지가 닫힙니다. */}
    </div>
  );
};

export default WriteTradingRecordPage;
