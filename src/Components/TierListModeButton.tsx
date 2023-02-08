import * as React from 'react';

export interface ITierListModeButtonProps {
    iconSrc: string;
    selected: boolean;
    name: string;
    onClick: () => void;
}

export default function TierListModeButton (props: ITierListModeButtonProps) {
    return (
        <div 
            className={getButtonClassName(props.selected)}
            onClick={props.onClick}
        >
            <img 
                src={props.iconSrc}
                alt={`${props.name} Icon`}
                className='tier-list-mode-icon'
            />
            <span className='tier-list-mode-text'>{props.name}</span>
        </div>
    );
}

function getButtonClassName(selected: boolean) {
    let className = 'tier-list-mode-button';
    if(selected) {
        className += ' tier-list-mode-button-active';
    }
    return className;
}
