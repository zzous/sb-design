import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../legacy/admin.css';
export interface DateRangePickerProps {
  label?: string;
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const dateLists = [
  { label: '당일', value: '0' },
  { label: '1개월', value: '30' },
  { label: '3개월', value: '90' },
  { label: '6개월', value: '180' },
  { label: '1년', value: '365' },
];

export const DateRangePicker = ({ label = '기간검색', onDateChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange?.(date, endDate);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date);
    onDateChange?.(startDate, date);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newEndDate = new Date(new Date().setDate(new Date().getDate() - parseInt(value)));
    setEndDate(newEndDate);
    onDateChange?.(startDate, newEndDate);
  };

  return (
    <div className="date-picker">
      <div className="item">
        <label>{label}</label>
        <div className="input">
          <select className="custom-select" onChange={handleChangeDate}>
            {dateLists.map((item, index) => (
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>
          <ReactDatePicker selectsEnd selected={endDate} onChange={handleChangeEndDate} />
          <ReactDatePicker selectsStart selected={startDate} onChange={handleChange}  />
        </div>
      </div>
    </div>
  );
};


DateRangePicker.displayName = 'DateRangePicker';
