import * as React from 'react';
import GroupViewProvider from './GroupViewProvider';
import EditModeProvider from '../Context/EditingModeContext';
import TierListModeButtonsGroup from './TierListModeButtonsGroup';

export interface ITierListProps {
}

export default function TierList (props: ITierListProps) {
    return (
        <div className='tier-list'>
            <EditModeProvider>
                <h1 className='tier-list-header'>Tier List</h1>
                <TierListModeButtonsGroup />
                <GroupViewProvider />
            </EditModeProvider>
        </div>
    );
}