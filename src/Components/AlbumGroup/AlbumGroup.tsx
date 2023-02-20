import * as React from 'react';
import { AlbumsData } from '../../Data/Data';
import Album from '../Album/Album';
import { RankedAlbum } from '../AlbumsView/AlbumsView';
import './AlbumGroup.css'

export interface IAlbumGroupProps {
  name: string;
  id: string;
  rankedAlbums: RankedAlbum[];
  onAlbumClick: (id: string) => void;
}

const AlbumGroup : React.FC<IAlbumGroupProps> = (props) => {
  const albumItems = mapAlbums(props.rankedAlbums, props.onAlbumClick);

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
  rankedAlbums: readonly RankedAlbum[],
  onAlbumClick: (id: string) => void) => {
  return rankedAlbums.map((album) => {
    const albumData = AlbumsData[album.id];
    return (
      <div
        className='album view'
        onClick={() => {onAlbumClick(album.id)}}
        onMouseDown={() => false}
        key={album.id}
      >
        <Album
          {...albumData}
          edit={false}
          tier={album.tier}
          draggable={false}
          key={album.id}
        />
      </div>
    );
  });
}

export default AlbumGroup;