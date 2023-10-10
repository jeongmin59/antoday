import { Link } from "react-router-dom";
// import { tradingImage } from "../../../assets/img/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'

const TradeHistory = () => {
    return (
        <Link to='/tradingrecord'>
        <div>
            <FontAwesomeIcon icon={faUser} />
            <div>매매 일지</div>
        </div>
        </Link>
    )
}

export default TradeHistory;