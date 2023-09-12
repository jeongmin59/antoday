import { Link } from "react-router-dom";

const TradeHistory = () => {
    return (
        <Link to='/tradingrecord'>
        <div>
            <img src="/trading.png" alt="" />
            <div>매매 일지</div>
        </div>
        </Link>
    )
}

export default TradeHistory;