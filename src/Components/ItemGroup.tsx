import * as React from 'react';
import AlbumItem from './AlbumItem';
import { useAlbums, AlbumsState } from '../Context/AlbumsContext';
import { AlbumFilter } from './GroupView';
import { Draggable } from 'react-beautiful-dnd';

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
        <Draggable key={album.name} draggableId={album.name} index={idx}>
        {
          (provided) => (
            <div
            key={idx}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <AlbumItem
                key={idx}
                album={album}
              />
            </div>
          )
        }
        </Draggable>
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
