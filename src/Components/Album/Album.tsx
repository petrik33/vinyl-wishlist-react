import * as React from 'react';
import WebImage from '../Utilities/WebImage';
import { IAlbum } from '../../Data/Data';
import { TierName } from '../../Context/TierGroupsContext';
import './Album.css';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';
import { Tier } from '../../Context/TierGroupsContext';

export enum AlbumMode {
  VIEW = 'view',
  EDIT = 'edit'
}

export interface IAlbumProps extends IAlbum {
  tier: Tier;
  draggable: boolean;
}

const Album : React.FC<IAlbumProps> = (props) => {
  
  return (
    <div 
      className={getAlbumClass(props.tier)}
      key={props.id}
      id={props.id}
    >
        <WebImage
          src={props.src}
          alt={getAlbumCoverAlt(props.name)}
          key={props.id}
          className='album-image'
          draggable={props.draggable}
        />
    </div>
  );
}

const getAlbumClass = (tier?: TierName | null) => {
  let className = 'album';

  if(tier) {
    className += ' tiered';
    className += ` ${tier}-tier`;
  }

  return className;
}

export default Album;