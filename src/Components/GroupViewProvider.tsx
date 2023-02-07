import * as React from 'react';
import GroupView from './GroupView';
import AlbumModalViewIdProvider from '../Context/AlbumModalViewContext';

export default function GroupViewProvider() {
    return (
        <AlbumModalViewIdProvider>
            <GroupView />
        </AlbumModalViewIdProvider>
    );
} 
