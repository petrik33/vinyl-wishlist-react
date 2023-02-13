import * as React from 'react';
import WebImage from '../Utilities/WebImage';
import { IAlbum } from '../../Data/Data';
import { TierName } from '../../Context/TierGroupsContext';
import './Album.css';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';
import { DraggableProvided } from 'react-beautiful-dnd';

export interface IAlbumProps extends IAlbum {
  tier: TierName | null;
  draggable: boolean;
  onClick: (id: string) => void;
  innerRef?: DraggableProvided['innerRef'];
}

const Album : React.FC<IAlbumProps> = (props) => {
  const onClick = React.useCallback((event: React.MouseEvent) => {
    props.onClick(props.id);
    event.preventDefault();
  }, [props]);

  return (
    <div 
      onClick={onClick}
      onMouseDown={() => false}
      className='album'
      id={props.id}
      ref={props.innerRef}
    >
        <WebImage
          src={props.src}
          alt={getAlbumCoverAlt(props.name)}
          style={getTierStyle(props.tier)}
          className='album-image'
          draggable={props.draggable}
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