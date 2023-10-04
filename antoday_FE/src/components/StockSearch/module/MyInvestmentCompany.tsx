import { useState, useEffect } from 'react';
import styles from "./MyInvestmentCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilValue } from "recoil";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MyInvestmentCompany: React.FC = () => {
  const [myInvestmentCompanies, setMyInvestmentCompanies] = useState<CompanyInfo[]>([]);
  const token = useRecoilValue(accessTokenAtom);
  const [totalPages, setTotalPages] = useState(1);
  const [nowPage, setNowPage] = useState<number>(0);
  const nextPage = nowPage + 1;

  useEffect(() => {
    fetchInvestmentCompanies(0);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchInvestmentCompanies(newPage); 
    setNowPage(newPage)
};
const fetchInvestmentCompanies = async (page = 0) => {
  const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/trade/corp`;
  try {
    const response = await axios.get(apiUrl, {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { content, totalPages } = response.data;
    setMyInvestmentCompanies(content);
    setTotalPages(totalPages);
  } catch (error) {
    console.error("Error fetching favorite companies:", error);
  }
};

// const loadMore = () => {
//   if (nowPage < totalPages) {
//     setNowPage(nextPage);
//     fetchInvestmentCompanies(nextPage);
//   }
// };

// const loadPrevious = () => {
//   if (nowPage > 0) {
//     setNowPage(nowPage - 1);
//     fetchInvestmentCompanies(nowPage - 1);
//   }
// };

  return (
    <div>
    <div className={styles.mainContainer}>
      {myInvestmentCompanies?.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}
        <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(nowPage - 1)}
        disabled={nowPage === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span style={{ fontSize: "var(--font-h2)" }}>{nowPage + 1}</span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(nowPage + 1)}
        disabled={nowPage >= totalPages - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
    </div>
  
    </div>
  );
};

export default MyInvestmentCompany;