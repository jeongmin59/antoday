import React, { useState, useEffect } from "react";
import styles from "./StockInfoPage.module.css";
import StockInfoBasic from "../../components/StockInfo/template/StockInfoBasic";
import StockInfoDetail from "../../components/StockInfo/template/StockInfoDetail";
import { useQuery } from "react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TopButton from "../../components/Common/atom/TopButton";
import StockInfoBasicSkeleton from "./../../components/StockInfo/module/StockInfoBasicSkeleton";
import StockInfoDetailSkeleton from "./../../components/StockInfo/module/StockInfoDetailSkeleton";

interface StockInfoPageProps {
	stockPk: string;
}

const StockInfoPage: React.FC<StockInfoPageProps> = ({ stockPk }) => {
	const [corpIntro, setCorpIntro] = useState<stockIntro>();
	const [corpInfo, setCorpInfo] = useState(null);
	const [graphValue, setGraphValue] = useState(null);
	const [corpOverview, setCorpOverview] = useState(null);
	const [corpHistory, setCorpHistory] = useState(null);

	const {
		data: stockInfoResults,
		isLoading: isLoading1,
		// isError: isError1,
	} = useQuery("stockInfoResults", async () => {
		const params = new URLSearchParams();
		params.append("stock_code", stockPk);

		try {
			const response = await axios.get(
				import.meta.env.VITE_DATA_API_URL +
					`/corp/overview?${params.toString()}`
			);

			setCorpInfo(response.data.indicator);
			setGraphValue(response.data.value);
			setCorpOverview(response.data.info);
			setCorpHistory(response.data.history);
			return response.data;
		} catch (error) {
			console.error("overview 실패", error);
			throw error;
		}
	});

	const {
		data: stockIntro,
		isLoading: isLoading2,
		// isError: isError2,
	} = useQuery("stockIntro", async () => {
		try {
			const response = await axios.get(
				import.meta.env.VITE_DATA_API_URL + `/corp/index/${stockPk}`
			)

;
			setCorpIntro(response.data);
			return response.data;
		} catch (error) {
			console.error("기본정보 실패", error);
			throw error;
		}
	});

	useEffect(() => {
	}, [stockInfoResults, stockIntro, corpHistory]);


	return (
		<div className={styles.stockInfoPageContainer}>
			<div className={styles.mainContainer}>
				{isLoading2 ? (
					<StockInfoBasicSkeleton />
				) : (
					<StockInfoBasic corpIntro={corpIntro} />
				)}
				{isLoading1 ? (
					<StockInfoDetailSkeleton />
				) : (
          <>
					<StockInfoDetail
						stockPk={stockPk}
						graphValue={graphValue}
						corpInfo={corpInfo}
						corpIntro={corpIntro}
						corpOverview={corpOverview}
						corpHistory={corpHistory}
            />
            </>
				)}
			</div>
			<TopButton />
		</div>
	);
};

export default StockInfoPage;
