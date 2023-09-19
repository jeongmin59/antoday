import { Link } from "react-router-dom";
// import { companyImage } from "../../../assets/img/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'

const Companyinfo = () => {
    return (
        <Link to='/stocksearch'>
        <div>
            <FontAwesomeIcon icon={faNewspaper} />
            <div>기업 정보</div>
        </div>
        </Link>
    )
}

export default Companyinfo;
