import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

interface StockSearchResultsProps {
  keyword: string;
}

const StockSearchResults : React.FC<StockSearchResultsProps> = ({keyword}) => {
    
		const { data : searchResults , isLoading, isError } = useQuery(
			'searchResults',
			async () => {
					const params = new URLSearchParams();
					params.append('keyword', keyword);
					params.append('page', '0');
					const response = await axios.get(import.meta.env.VITE_BACK_API_URL + `/api/corp/search?${params.toString()}`);
					
					return response.data;
			},
			{
					enabled: !!keyword,
			}
	)

    return ( 
        <React.Fragment>
					<h1>검색결과</h1>
        </React.Fragment>
    );
}

export default StockSearchResults;