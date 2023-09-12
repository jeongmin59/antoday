import { Link } from "react-router-dom";
import { companyImage } from "../../../assets/img/common";


const Companyinfo = () => {
    return (
        <Link to='/companysearch'>
        <div>
            <img src={companyImage} alt="" />
            <div>기업 정보</div>
        </div>
        </Link>
    )
}

export default Companyinfo;
