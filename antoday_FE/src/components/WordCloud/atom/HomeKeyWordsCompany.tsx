import React, { useEffect } from "react";
import styles from "./HomeKeyWordsCompany.module.css";
import { useRecoilState } from "recoil";
import { corpDataAtom } from "../../../recoil/wordCloud";

// type HomeKeyWordsCompanyProps = {
//   data: CompanyInfo[];
// };

const HomeKeyWordsCompany: React.FC = () => {
  const [corps, setCorps] = useRecoilState(corpDataAtom);

  useEffect(() => {}, [corps]);

  return (
    <div>
      <div className={styles.title}>관련된 기업이에요!</div>
      <div className={styles.companyContainer}>
        {corps?.map((companyInfo) => (
          <div className={styles.grid}>
            <div key={companyInfo.stock_code} className={styles.companyItem}>
              <div className={styles.logoImageContainer}>
                <img
                  className={styles.logoImage}
                  src={companyInfo.logo_url}
                  alt={`${companyInfo.corp_name} 로고`}
                />
              </div>
              <div className={styles.companyName}>{companyInfo.corp_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeKeyWordsCompany;
