import React, { useState } from "react";
import styles from "./FavoriteCompanyButton.module.css";
import { useRecoilState } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";

interface StockInfoBasicProps {
  stockPk?: string;
}

const FavoriteCompanyButton: React.FC<StockInfoBasicProps> = ({ stockPk }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useRecoilState(accessTokenAtom);

  // 관심 기업 등록 API 호출
  const addFavoriteCompany = async () => {
    const url =
      import.meta.env.VITE_BACK_API_URL + `/api/userstock?stockCode=${stockPk}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("관심기업에 등록되었습니다:)");
      setIsFavorite(true);
    }
  };

  // 관심 기업 등록 취소 API 호출
  const removeFavoriteCompany = async () => {
    const url = `https://antoday.site/api/userstock/${stockPk}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("관심기업등록이 취소되었습니다:(");
      setIsFavorite(false);
    }
  };

  return (
    <div>
      <span onClick={isFavorite ? removeFavoriteCompany : addFavoriteCompany}>
        {isFavorite ? "♥" : "♡"}
      </span>
    </div>
  );
};

export default FavoriteCompanyButton;
