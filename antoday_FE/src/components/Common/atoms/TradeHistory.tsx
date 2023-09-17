import { Link } from "react-router-dom";
// import { tradingImage } from "../../../assets/img/common";

const TradeHistory = () => {
    return (
        <Link to='/tradingrecord'>
        <div>
            {/* <img src={tradingImage} alt="" /> */}
            <div>매매 일지</div>
        </div>
        </Link>
    )
}

export default TradeHistory;