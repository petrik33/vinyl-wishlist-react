import * as React from 'react';
import { Author, Album } from '../Data';
import AlbumItem from './AlbumItem';

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
      />
    )
  });

  return (
    <section className='item-group'>
      {itemsList}
      <div className='group-name'>{props.name}</div>
    </section>
  );
}
