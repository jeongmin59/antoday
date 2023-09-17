import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';

const StockSearchBar : React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');

    // 나중에 검색 결과 디테일하게 할 때 사용하려고 미리 작성해둔 useEffect
    useEffect(() => {
        console.log('입력값이 변경되었습니다:', inputValue);
    }, [inputValue]);
    
    const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
        setInputValue(event.target.value);
    };

    const { data : searchResults, isLoading, isError } = useQuery(
        'searchResults',
        async () => {
            const params = new URLSearchParams();
            params.append('keyword', inputValue);
            params.append('page', '0');

            const response = await axios.get(import.meta.env.VITE_BACK_API_URL + `/api/corp/search?${params.toString()}`);
            return response.data;
        },
        {
            enabled: !!inputValue, //inputValue 값이 변경될때만 실행
        }
    )


    const handleSubmit = async(event : React.FormEvent ) => {
        //기본 제출 동작 방지
        event.preventDefault();
    };

    console.log('리액트쿼리이거맞나',searchResults,isLoading,isError)
    
    return ( 
        <React.Fragment>
            <form onSubmit={handleSubmit} className="SearchBarContainer">
                {/* <img src="#" alt="검색아이콘" /> */}
                <input type="text" placeholder="검색어를 입력하세요" value={inputValue} onChange={handleChange} />
                <button type="submit">search</button>
            </form>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data</div>}
        </React.Fragment>
    );
}

export default StockSearchBar;