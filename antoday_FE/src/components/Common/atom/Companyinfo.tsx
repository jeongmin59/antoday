import { Link } from "react-router-dom";
// import { companyImage } from "../../../assets/img/common";

const Companyinfo = () => {
    return (
        <Link to='/stocksearch'>
        <div>
            {/* <FontAwesomeIcon icon={faNewspaper} /> */}
            <div>종목 정보</div>
        </div>
        </Link>
    )
}

export default Companyinfo;
