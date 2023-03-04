import * as React from 'react';
import WebImage from '../Utilities/WebImage';
import { IAlbum, Tier } from '../../Data/Data';
import './Album.css';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';

export enum AlbumMode {
  VIEW = 'view',
  EDIT = 'edit'
}

export interface IAlbumProps extends IAlbum {
  draggable: boolean;
  edit: boolean;
}

const Album : React.FC<IAlbumProps> = (props) => {
  
  return (
    <div 
      className={getAlbumClass(props.tier, props.edit)}
      key={props.id}
      id={props.id}
    >
        <WebImage
          src={props.src}
          alt={props.alt}
          key={props.id}
          draggable={props.draggable}
        />
    </div>
  );
}

const getAlbumClass = (tier: Tier, edit: boolean) => {
  let className = 'album';

  if(tier) {
    className += ' tiered';
    className += ` ${tier}-tier`;
  }

  if(edit) {
    className += ' edit';
  } else {
    className += ' view';
  }

  return className;
}

export default Album;