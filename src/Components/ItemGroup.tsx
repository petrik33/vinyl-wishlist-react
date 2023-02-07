import * as React from 'react';
import AlbumItem from './AlbumItem';
import { useAlbums, AlbumsState } from '../Context/AlbumsContext';
import { AlbumFilter } from './GroupView';

export interface IItemGroupProps {
  groupFilter: AlbumFilter; 
  name: string;
}

export default function ItemGroup (props: IItemGroupProps) {
  const albumsAll = useAlbums();
  if(!albumsAll) {
    return null;
  }

  const groupAlbums: AlbumsState = albumsAll.filter(props.groupFilter);

  const groupItems = groupAlbums.map((album, idx) => {
      return (
          <AlbumItem
            key={idx}
            {...album}
          ></AlbumItem>  
      );
  })

  return (
    <section className='item-group'>
      <div className='item-group-items-container'>
        {groupItems}
      </div>
      <div className='item-group-name'>{props.name}</div>
    </section>
  );
}
