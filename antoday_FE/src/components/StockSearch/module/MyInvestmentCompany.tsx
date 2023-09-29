import { useState, useEffect } from 'react';
import styles from "./FavoriteCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilState } from "recoil";
import axios from 'axios';

const MyInvestmentCompany: React.FC = () => {
  const [myInvestmentCompanies, setMyInvestmentCompanies] = useState<CompanyInfo[]>([]);
  const [token, setToken] = useRecoilState(accessTokenAtom);

  useEffect(() => {
    const fetchInvestmentCompanies = async () => {
      const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/trade/corp`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setMyInvestmentCompanies(response.data);
      } catch (error) {
        console.error("Error fetching favorite companies:", error);
      }
    };
    fetchInvestmentCompanies();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {myInvestmentCompanies?.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}
    </div>
  );
};

export default MyInvestmentCompany;
