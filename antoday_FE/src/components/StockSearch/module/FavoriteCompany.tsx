import { useState, useEffect } from 'react';
import styles from "./FavoriteCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilState } from "recoil";
import axios from 'axios';

const FavoriteCompany: React.FC = () => {
  console.log('여기는 FavoriteCompany 컴포넌트')
  const [favoriteNowPage, setFavoriteNowPage] = useState<number>(0);
  const [favoriteCompanies, setFavoriteCompanies] = useState<CompanyInfo[]>([]);
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [companyCountOnCurrentPage, setCompanyCountOnCurrentPage] = useState<number>(0); // 현재 페이지의 기업 개수
  const MAX_COMPANIES_PER_PAGE = 10; 

  useEffect(() => {
    const fetchFavoriteCompanies = async () => {
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
        setCompanyCountOnCurrentPage(response.data.content.length); // 현재 페이지의 기업 개수 저장
      } catch (error) {
        console.error("Error fetching favorite companies:", error);
      }
    };
    fetchFavoriteCompanies();
  }, [favoriteNowPage]);

  return (
    <div className={styles.mainContainer}>
      {favoriteCompanies.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}

      {/* <button onClick={() => setFavoriteNowPage(prev => prev - 1)} disabled={favoriteNowPage <= 0}>이전</button>
      <button onClick={() => setFavoriteNowPage(prev => prev + 1)} disabled={companyCountOnCurrentPage < MAX_COMPANIES_PER_PAGE}>다음</button> */}
    </div>
  );
};

export default FavoriteCompany;
