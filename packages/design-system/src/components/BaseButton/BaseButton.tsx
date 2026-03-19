import React from 'react';
import '../../legacy/admin.css';

export interface BaseButtonProps {
    label?: string;
    type?: string;
    iconClass?: string;
    btnsize?: 'sm' | 'md' | 'lg';
    iconSize?: 'sg' | 'mg' | 'lg';
    offscreen?: boolean;
    changeValue?: (value: string) => void;
}

export const BaseButton = ({ label, btnsize, iconClass, type, iconSize, offscreen, changeValue }: BaseButtonProps) => {
    const changeValueHandler = () => {
        console.log('버튼 클릭:', label);
        changeValue?.(label || '');
    }

    return (
        <button type="button" className={`btn btn-${btnsize || 'sm'}`} onClick={changeValueHandler}>
            {type === 'icon' && (
                <span className={`${iconClass} ${iconSize ? `${iconSize}` : ''}`}></span>
            )}
            {offscreen && <span className="offscreen">{label}</span>}
            {!offscreen && label}
        </button>
    );
};

BaseButton.displayName = 'BaseButton';
