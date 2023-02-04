import * as React from 'react';
import { Album, AlbumTier } from '../Context/AlbumsContext';

export interface IGroupViewProps {
    
}

export default function GroupView (props: IGroupViewProps) {
    
}

const TIERS: AlbumTier[] = ['S', 'A', 'B', 'C', 'D', null];

enum GroupType {
    TIER
}

function getGroupFilter() {
    return null;
}
