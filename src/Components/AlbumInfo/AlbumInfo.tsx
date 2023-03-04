import * as React from 'react';
import './AlbumInfo.css'
import WebImage from '../Utilities/WebImage';
import { IAlbum } from '../../Data/Data';

export interface IAlbumInfoProps {
  album: IAlbum;
  onClose: () => void;
}

const AlbumInfo : React.FC<IAlbumInfoProps> = (props) => {
  const { album, onClose } = {...props};
  const onClick = (event: React.MouseEvent) => {
    const nodeClicked = event.target as HTMLElement;
    const infoClicked = nodeClicked.closest('.album-modal-info');
    if(!infoClicked) {
      onClose();
    }
  }

  return (
    <div className='modal-div' onClick={onClick}>
      <div className='album-modal-info'>
        <WebImage
          src={album.src}
          alt={album.alt}
          className='album-modal-image'
        />
        <div className='album-modal-data'>
          <div className='album-modal-author'>
            {album.author}
          </div>
          <div className='album-modal-name'>
            {album.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;