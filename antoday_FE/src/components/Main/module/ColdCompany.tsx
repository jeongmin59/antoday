import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ColdCompany.module.css";
import HotColdCompanySkeleton from "./HotColdCompanySkeleton";

const ColdCompany: React.FC = () => {
  const [coldCompanies, setColdCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL + "/corp/cold"
        );
        setColdCompanies(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>현재<span className={styles.coldText}>차가운</span>기업</div>
        <div className={styles.gradation}>COLD</div>
      </div>
      <div className={styles.companyContainer}>
        {isLoading ? (
          <HotColdCompanySkeleton />
        ) : (
          <div className={styles.listContainer}>
            <ul>
              {coldCompanies.map((company, index) => (
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
        )}
      </div>
    </div>
  );
};

export default ColdCompany;
