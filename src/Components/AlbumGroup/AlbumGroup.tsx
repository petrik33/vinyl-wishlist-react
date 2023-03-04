import * as React from 'react';
import Album from '../Album/Album';
import './AlbumGroup.css'
import { IAlbum } from '../../Data/Data';

export interface IAlbumGroupProps {
  name: string;
  order?: string[];
  albums: readonly IAlbum[]
  onAlbumClick: (id: string) => void;
}

const AlbumGroup : React.FC<IAlbumGroupProps> = (props) => {
  const albumItems = mapAlbums(props);

  return (
    <div className='album-group view named'>
      <div className='albums-container view'>
        {albumItems}
      </div>
      <div className='album-group-name view'>{props.name}</div>
    </div>
  );
}

const mapAlbums = (
  { albums, onAlbumClick }: IAlbumGroupProps
) => {
  return albums.map((album) => {
    return (
      <div
        className='album view'
        onClick={() => {onAlbumClick(album.id)}}
        onMouseDown={() => false}
        key={album.id}
      >
        <Album
          {...album}
          edit={false}
          draggable={false}
          key={album.id}
        />
      </div>
    );
  });
}

export default AlbumGroup;