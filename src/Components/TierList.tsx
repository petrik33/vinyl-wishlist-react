import * as React from 'react';
import GroupView, { IGroupViewProps } from './GroupView';
import AlbumModalView from './AlbumModalView';
import GroupViewProvider from './GroupViewProvider';

export interface ITierListProps {
}

export default function TierList (props: ITierListProps) {

    return (
        <div className='tier-list'>
            <GroupViewProvider />
        </div>
    );
}