import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./HotCompany.module.css";

const HotCompany: React.FC = () => {
  const [hotCompanies, setHotCompanies] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL + "/corp/hot"
        );
        setHotCompanies(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>현재 뜨거운 기업</div>
      <div className={styles.companyContainer}>
        <div className={styles.listContainer}>
          <ul>
            {hotCompanies.map((company, index) => (
              <li key={index}>
                <Link to={`/stockinfo/${company.stock_code}`}>
                  <div className={styles.companyList}>
                    <div>
                      <img
                        className={styles.companyImage}
                        src={company.logo_url}
                        alt={company.corp_name}
                      />
                    </div>
                    <div className={styles.corpName}>
                      <p>{company.corp_name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotCompany;
