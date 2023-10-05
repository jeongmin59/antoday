import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../../DatePicker.css";
import styles from "./SearchingDate.module.css";
import { excludedDates } from "../../../utils/excludedDates";

interface SearchInputProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const SearchingDate: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    if (startDate && endDate) {
      const startStr = formatDate(startDate);
      const endStr = formatDate(endDate);
      onSearch(startStr, endStr);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleSearch();
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.dateContainer}>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={startDate}
        onChange={(date: Date | [Date, Date] | null) =>
          setStartDate(date as Date)
        }
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate ? endDate : new Date()}
        placeholderText="시작 날짜"
        className={styles.datepicker}
      />
      <span>~</span>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={endDate}
        onChange={(date: Date | [Date, Date] | null) =>
          setEndDate(date as Date)
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        maxDate={new Date()}
        minDate={startDate}
        placeholderText="종료 날짜"
        className={styles.datepicker}
 />
    </div>
  );
};

export default SearchingDate;
