import React from "react";
import styles from "./StockInfoBasic.module.css";
import FavoriteCompanyButton from "../atom/FavoriteCompanyButton";
import { addCommas } from "../../../utils/addCommas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import StockInfoSummary from "./StockInfoSummary";
import { accessTokenAtom } from "../../../recoil/auth";
import { useRecoilValue } from "recoil";

interface StockInfoBasicProps {
	corpIntro?: stockIntro;
}

const StockInfoBasic: React.FC<StockInfoBasicProps> = ({ corpIntro }) => {
	const navigator = useNavigate();
	const corpName = corpIntro?.corp_name;
	const price = corpIntro ? addCommas(corpIntro.index) : ""; // addCommas 함수 적용
	const stockCode = corpIntro?.stock_code;
	const change = corpIntro ? addCommas(corpIntro.change) : ""; // addCommas 함수 적용
	const market = corpIntro?.market;
	const lowValue = corpIntro?.low52;
	const highValue = corpIntro?.high52;
	const token = useRecoilValue(accessTokenAtom);

	console.log(lowValue, highValue);
	const handleClick = () => {
		navigator("/tradingrecord");
		//이후 해당하는 기록 볼수있게 수정해야함
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.stockInfoBasicContainer}>
				<div className={styles.LeftContainer}>
					<div className={styles.stockCode}>
						{stockCode}
						<span
							style={{
								fontSize: "var(--font-h3)",
								color: "var(--main-gray-color)",
								marginLeft: "0.2rem",
							}}
						>
							{market}
						</span>
					</div>
					<div className={styles.stockNameContainer}>{corpName}</div>
					<div className={styles.stocPrice}>
						{price}원
						<span
							style={{
								fontSize: "var(--font-h3)",
								fontWeight: "normal",
								color: "var(--main-gray-color)",
								marginLeft: "0.5rem",
							}}
						>
							어제보다
						</span>
						<span
							style={{
								fontSize: "var(--font-h3)",
								fontWeight: "normal",
								color: change < "0" ? "var(--main-blue-color)" : "red",
							}}
						>
							{change >= "0" ? `+${change}` : change}원
						</span>
					</div>
				</div>
				<div className={styles.RightContainer}>
					{token && (
						<FavoriteCompanyButton
							stockPk={stockCode}
							isLiked={null}
						/>
					)}
					{token && (
						<FontAwesomeIcon
							icon={faPenClip}
							size="sm"
							className={styles.pencilIcon}
							onClick={handleClick}
						/>
					)}
				</div>
			</div>
			<StockInfoSummary
				lowValue={lowValue}
				highValue={highValue}
			/>
		</div>
	);
};

export default StockInfoBasic;
