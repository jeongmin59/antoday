import { useParams } from "react-router-dom";
import StockInfoPage from "../../../pages/StockPage/StockInfoPage";

interface Params {
  [stockPk: string]: string | undefined;
}

const InfoPageSearchBar : React.FC = () => {

  const stockPk = useParams<Params>()?.stockPk || "";


  return (
    <>
    <div>
      정보페이지에 들어갈 검색바
    </div>
    <StockInfoPage stockPk={stockPk} />
    </>
  );
};

export default InfoPageSearchBar;
