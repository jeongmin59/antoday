import React from 'react';

interface TradingRecordListProps {
    records?: TradingRecord[];
}
interface TradingRecord {
    stock_code: string;
    corp_name: string;
    logo_url: string;
    trade_at: string;
    price: number;
    cnt: number;
    키워드_작성_여부: boolean;
}


const TradingRecordList: React.FC<TradingRecordListProps> = ({ records }) => {
    if (!records) {
        return (
            <div>
                초기화면이지롱
            </div>
        );
    }

    if (records.length > 0) {
        // 검색 결과가 있는 경우
        return (
            <div>
                <h2>검색 결과</h2>
                <ul>
                    {records.map((record, index) => (
                        <li key={index}>
                            {/* 레코드 데이터를 표시 */}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        // 검색 결과가 없는 경우
        return (
            <div>
                <p>검색 결과가 없습니다.</p>
            </div>
        );
    }
};

export default TradingRecordList;
