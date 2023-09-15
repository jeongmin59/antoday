import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import TradingRecordList from '../components/TradingRecord/templates/TradingRecordList';
import WriteTradingRecordButton from '../components/TradingRecord/atoms/WriteTradingRecordButton';
import WriteTradingRecordPage from '../components/TradingRecord/templates/WriteTradingRecord';

export interface TradingRecordPageType {
  cnt: number;
  corpName: string;
  logo_url: string;
  optionBuySell: boolean;
  price: number;
  stockCode: string;
  tradeAt: string;
  tradePk: number;
}

// const TradingRecord: React.FC<{ record: TradingRecordPageType }> = ({ record }) => {
//   return (
//     <div key={record.tradePk}>
//       <p>Trade PK: {record.tradePk}</p>
//       <p>Price: {record.price}</p>
//       <p>Count: {record.cnt}</p>
//       <p>Option Buy/Sell: {record.optionBuySell ? 'Buy' : 'Sell'}</p>
//       <p>Trade At: {record.tradeAt}</p>
//       <p>Stock Code: {record.stockCode}</p>
//       <p>Corp Name: {record.corpName}</p>
//     </div>
//   );
// };


const TradingRecordPage: React.FC = () => {
  const [records, setRecords] = useState<TradingRecordPageType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showWrite, setShowWrite] = useState(false);

  useEffect(() => {
    axios.get('http://j9e107.p.ssafy.io:8080/api/trade', {
      params: { page },
    })
    .then((response) => {
      // console.log(response.data.content)
      setRecords(response.data.content);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [page]);

  const fetchMoreData = () => {
    axios.get('http://j9e107.p.ssafy.io:8080/api/trade', {
      params: { page: page + 1 },
    })
    .then((response) => {
      const newData = response.data.content;
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setRecords([...records, ...newData]);
        setPage(page + 1);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const closeWritePage = () => {
    setShowWrite(false);
  }
  const openWritePage = () => {
    setShowWrite(true);
  }

  return (
    <div>
      <h3>매매 이유를 작성하면 AI 분석을 받을 수 있어요!</h3>
      <WriteTradingRecordButton onClick={openWritePage}/>
      {showWrite ? <WriteTradingRecordPage closeWritePage={closeWritePage}/> : <TradingRecordList records={records} hasMore={hasMore} fetchMoreData={fetchMoreData} />}
    </div>
  );
};

export default TradingRecordPage;
