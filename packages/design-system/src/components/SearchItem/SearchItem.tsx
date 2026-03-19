import React from 'react';
import '../../legacy/admin.css';

export interface SearchItemProps {
  label?: string;
  type?: string;
  value?: string;
  selectData?: { value: string; label: string }[];
  changeValue?: (value: string) => void;
}

export const SearchItem = ({ label, type,selectData, value, changeValue }: SearchItemProps) => {
    const chagngeValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log('검색어 변경:', e.target.value);
        changeValue?.(e.target.value);
    };

    return (
        <div className={'item'}>
            <label>{label}</label>
            {type === 'input' && (
                <span className={'input'}>
                    <input type="text" className={'form-control'} onChange={chagngeValueHandler} value={value || ''} />
                </span>
            )}
            {type === 'select' && (
                <span className={'input'}>
                    <select className={'custom-select'} onChange={chagngeValueHandler} value={value || ''}>
                        <option value="">선택하세요</option>
                        {selectData?.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </span>
            )}
            {type === 'radio' && (
                <span className={'input'}>
                    { selectData?.map((option, index) => (
                        <span key={index} className={'radio'}>
                            <input type="radio" id={`${label}-option${index}`} name={label} value={option.value} checked={value === option.value} onChange={chagngeValueHandler} />
                            <label htmlFor={`${label}-option${index}`}>{option.label} </label>
                        </span>
                    )) }
                </span>
            )}
            {type === 'checkbox' && (
                <span className={'input'}>
                    { selectData?.map((option, index) => (
                        <span key={index} className={'checkbox'}>
                            <input type="checkbox" id={`${label}-option${index}`} name={label} value={option.value} checked={value === option.value} onChange={chagngeValueHandler} />
                            <label htmlFor={`${label}-option${index}`}>{option.label}</label>
                        </span>
                    )) }
                </span>
            )}
        </div>
    );
};

SearchItem.displayName = 'SearchItem';
