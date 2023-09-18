import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchInputProps {
    onSearch: (startDate: string, endDate: string) => void; 
}

const SearchingDate: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleSearch = () => {
        if (startDate && endDate) {
            const startStr = startDate.toISOString().split('T')[0];
            const endStr = endDate.toISOString().split('T')[0];
            onSearch(startStr, endStr);
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            handleSearch();
        }
    }, [startDate, endDate]);
    

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date: Date | [Date, Date] | null) => setStartDate(date as Date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="시작 날짜 선택"
            />
            <DatePicker
                selected={endDate}
                onChange={(date: Date | [Date, Date] | null) => setEndDate(date as Date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="종료 날짜 선택"
            />
        </div>
    );
};

export default SearchingDate;
