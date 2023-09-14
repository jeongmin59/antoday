import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import TradingRecordList from '../components/TradingRecord/templates/TradingRecordList';

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

  useEffect(() => {
    axios.get('http://j9e107.p.ssafy.io:8080/api/trade', {
      params: { page },
    })
    .then((response) => {
      console.log(response.data.content)
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

  return (
    <div>
      <h1>Trading Record Page</h1>
      {/* TradingRecordList 컴포넌트로 데이터와 함수 전달 */}
      <TradingRecordList records={records} hasMore={hasMore} fetchMoreData={fetchMoreData} />
    </div>
  );
};

export default TradingRecordPage;
