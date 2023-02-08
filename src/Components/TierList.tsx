import * as React from 'react';
import GroupViewProvider from './GroupViewProvider';
import EditModeProvider from '../Context/EditingModeContext';
import TierListModeButtonsGroup from './TierListModeButtonsGroup';

export interface ITierListProps {
}

export default function TierList (props: ITierListProps) {
    return (
        <div className='tier-list'>
            <h1 className='tier-list-header'>Tier List</h1>
            <EditModeProvider>
                <TierListModeButtonsGroup />
                <GroupViewProvider />
            </EditModeProvider>
            <footer className='tier-list-footer'>Made by ?</footer>
        </div>
    );
}