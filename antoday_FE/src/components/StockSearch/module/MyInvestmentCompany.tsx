import { useState, useEffect } from 'react';
import styles from "./MyInvestmentCompany.module.css";
import FavoriteStockComponent from "../atom/FavoriteStockComponent";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilValue } from "recoil";
import axios from 'axios';

const MyInvestmentCompany: React.FC = () => {
  const [myInvestmentCompanies, setMyInvestmentCompanies] = useState<CompanyInfo[]>([]);
  const token = useRecoilValue(accessTokenAtom);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInvestmentCompanies(0);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchInvestmentCompanies(newPage - 1); 
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
  return (
    <div className={styles.mainContainer}>
      {myInvestmentCompanies?.map(company => (
        <FavoriteStockComponent companyInfo={company} key={company.stockCode} />
      ))}
      {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index} onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                  </button>
                    ))}
    </div>
  );
};

export default MyInvestmentCompany;
