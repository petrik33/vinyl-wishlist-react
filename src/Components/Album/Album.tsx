import * as React from 'react';
import WebImage from '../Utilities/WebImage';
import { IAlbum } from '../../Data/Data';
import { TierName } from '../../Context/TierGroupsContext';
import './Album.css';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';

export interface IAlbumProps extends IAlbum {
  tier: TierName | null;
  onClick: (id: string) => void;
}

const Album : React.FC<IAlbumProps> = (props) => {
  return (
    <div onClick={() => {props.onClick(props.id)}} className='album'>
      <WebImage
        src={props.src}
        alt={getAlbumCoverAlt(props.name)}
        style={getTierStyle(props.tier)}
        className='album-image'
      />
    </div>
  );
}

const getTierStyle = (tier: TierName | null) : React.CSSProperties => {
  let shadowColor : string;
  if(!tier) {
    shadowColor = 'inactive';
  } else {
    shadowColor = `tier-${tier}`;
  }

  const boxShadowProp = `var(--shadow-x-offset) var(--shadow-y-offset) var(--shadow-blur) var(--shadow-spread) var(--${shadowColor}-color)`;

  return {
    boxShadow: boxShadowProp
  }
}

export default Album;