import { useState, useEffect } from 'react';
import styles from "./FavoriteCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilState } from "recoil";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const FavoriteCompany: React.FC = () => {
  const [favoriteNowPage, setFavoriteNowPage] = useState<number>(0);
  const [favoriteCompanies, setFavoriteCompanies] = useState<CompanyInfo[]>([]);
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [companyCountOnCurrentPage, setCompanyCountOnCurrentPage] = useState<number>(0); // 현재 페이지의 기업 개수
  // const [nowPage, setNowPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchFavoriteCompanies = async (page = 0) => {
    const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/userstock`;
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page: page
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFavoriteCompanies(response.data.content);
      setCompanyCountOnCurrentPage(response.data.content.length); // 현재 페이지의 기업 개수 저장
      setTotalPages(response.data.totalPages)
      setFavoriteNowPage(page);
    } catch (error) {
      console.error("Error fetching favorite companies:", error);
    }
  };
  
  useEffect(() => {
    fetchFavoriteCompanies();
  }, []);

  return (
    <div>
    <div className={styles.mainContainer}>
      {favoriteCompanies.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}
      <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        onClick={() => fetchFavoriteCompanies(favoriteNowPage - 1)}
        disabled={favoriteNowPage === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span style={{ fontSize: "var(--font-h2)" }}>{favoriteNowPage + 1}</span>
      <button
        className={styles.button}
        onClick={() => fetchFavoriteCompanies(favoriteNowPage + 1)}
        disabled={favoriteNowPage >= totalPages - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
    </div>
    
    </div>
  );
};

export default FavoriteCompany;
