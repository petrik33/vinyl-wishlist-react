import * as React from 'react';
import { AlbumsData } from '../../Data/Data';
import Album, { AlbumMode } from '../Album/Album';
import { RankedAlbum } from '../AlbumsView/AlbumsView';
import './AlbumGroup.css'

export interface IAlbumGroupProps {
  name: string;
  id: string;
  rankedAlbums: readonly RankedAlbum[];
  onAlbumClick: (id: string) => void;
}

const AlbumGroup : React.FC<IAlbumGroupProps> = (props) => {
  const albumItems = props.rankedAlbums.map((album) => {
    const albumData = AlbumsData[album.id];
    return (
      <Album
        {...albumData}
        tier={album.tier}
        mode={AlbumMode.VIEW}
        draggable={false}
        isDraging={false}
        onClick={props.onAlbumClick}
        key={album.id}
      />
    );
  });

  return (
    <div className='album-group'>
      <div className='album-group-items-container'>
        {albumItems}
      </div>
      <div className='album-group-name'>{props.name}</div>
    </div>
  );
}

export default AlbumGroup;