import { useState, useEffect } from 'react';
import styles from "./FavoriteCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilState } from "recoil";
import axios from 'axios';

const MyInvestmentCompany: React.FC = () => {
  const [favoriteNowPage, setFavoriteNowPage] = useState<number>(0);
  const [favoriteCompanies, setFavoriteCompanies] = useState<CompanyInfo[]>([]);
  const [token, setToken] = useRecoilState(accessTokenAtom);

  useEffect(() => {
    const fetchInvestmentCompanies = async () => {
      const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/userstock`;
      try {
        const response = await axios.get(apiUrl, {
          params: {
            page: favoriteNowPage
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavoriteCompanies(response.data.content);
      } catch (error) {
        console.error("Error fetching favorite companies:", error);
      }
    };
    fetchInvestmentCompanies();
  }, [favoriteNowPage]);

  return (
    <div className={styles.mainContainer}>
      <div>투자기업</div>
      {favoriteCompanies.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}
    </div>
  );
};

export default MyInvestmentCompany;
