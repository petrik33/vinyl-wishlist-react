import * as React from 'react';

export interface ITierListProps {
}

export default function TierList (props: ITierListProps) {
    return (
        <div className='tier-list'>
            <h1 className='tier-list-header'>Tier List</h1>
            <footer className='tier-list-footer'>Made by ?</footer>
        </div>
    );
}