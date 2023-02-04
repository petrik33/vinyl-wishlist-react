import * as React from 'react';
import AlbumItem from './AlbumItem';
import { AlbumRank, Album } from '../Context/AlbumsContext';

export interface IItemGroupProps {
  items: Array<Album>;
  name: string;
}

export default function ItemGroup (props: IItemGroupProps) {
  const itemsList = props.items.map((item, idx) => {
    return (
      <AlbumItem
        key={item.id}
        name={item.name}
        src={item.coverSrc}
        rank={null}
      />
    )
  });

  return (
    <section className='item-group'>
      {itemsList}
      <div className='item-group-name'>{props.name}</div>
    </section>
  );
}
