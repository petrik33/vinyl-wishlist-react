import * as React from 'react';
import './AlbumsTierList.css';
import TierListHeader from '../TierListHeader/TierListHeader';
import TierListFooter from '../TierListFooter/TierListFooter';

export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
  return (
    <div className='tierlist'>
      <TierListHeader>TierList</TierListHeader>
      <TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;