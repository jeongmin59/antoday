import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const StockInfoPage = () => {
  return (
    <>
      종목정보검색
      <FontAwesomeIcon icon={faHeart} size="2x" style={{ color: "black" }} />
    </>
  );
};

export default StockInfoPage;
