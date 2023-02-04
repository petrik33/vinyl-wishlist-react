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

  let groupAlbums: AlbumsState = null;
  if(albumsAll) {
      groupAlbums = albumsAll.filter(props.groupFilter);
  }

  if(!groupAlbums) {
      return null;
  }

  const groupItems = groupAlbums.map((album, idx) => {
      return (
          <AlbumItem
              {...album}
          ></AlbumItem>  
      );
  })

  return (
    <section className='item-group'>
      {groupItems}
      <div className='item-group-name'>{props.name}</div>
    </section>
  );
}
