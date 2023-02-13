import * as React from 'react';
import './AlbumInfo.css'
import { AlbumsData, AuthorsData } from '../../Data/Data';
import WebImage from '../Utilities/WebImage';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';

export interface IAlbumInfoProps {
  albumId: string;
  onClose: () => void;
}

const AlbumInfo : React.FC<IAlbumInfoProps> = (props) => {
  const albumData = AlbumsData[props.albumId];
  const authorData = AuthorsData[albumData.authorId];

  const onClick = React.useCallback((event: React.MouseEvent) => {
    const nodeClicked = event.target as HTMLElement;
    const infoClicked = nodeClicked.closest('.album-modal-info');
    if(!infoClicked) {
      props.onClose();
    }
  }, [props]);
  //Check!!!

  return (
    <div className='modal-div' onClick={onClick}>
      <div className='album-modal-info'>
        <WebImage
          src={albumData.src}
          alt={getAlbumCoverAlt(albumData.name)}
          className='album-modal-image'
        />
        <div className='album-modal-data'>
          <div className='album-modal-author'>{authorData.name}</div>
          <div className='album-modal-name'>{albumData.name}</div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;