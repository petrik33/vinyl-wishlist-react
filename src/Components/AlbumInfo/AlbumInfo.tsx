import * as React from 'react';
import './AlbumInfo.css'
import WebImage from '../Utilities/WebImage';
import { IAlbumData } from '../../Data/Data';

export interface IAlbumInfoProps {
  albumData: IAlbumData;
  onClose: () => void;
}

const AlbumInfo : React.FC<IAlbumInfoProps> = (props) => {
  const { albumData, onClose } = {...props};
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
          src={albumData.src}
          alt={albumData.alt}
          className='album-modal-image'
        />
        <div className='album-modal-data'>
          <div className='album-modal-author'>
            {albumData.author}
          </div>
          <div className='album-modal-name'>
            {albumData.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;