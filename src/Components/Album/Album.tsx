import * as React from 'react';
import WebImage from '../Utilities/WebImage';
import { IAlbum } from '../../Data/Data';
import { TierName } from '../../Context/TierGroupsContext';
import './Album.css';
import { getAlbumCoverAlt } from '../../Utilities/getAlbumCoverAlt';
import { DraggableProvided } from 'react-beautiful-dnd';

export enum AlbumMode {
  VIEW = 'view',
  EDIT = 'edit'
}

export interface IAlbumProps extends IAlbum {
  tier: TierName | null;
  mode: AlbumMode;
  draggable: boolean;
  isDraging: boolean;
  onClick?: (id: string) => void;
  innerRef?: DraggableProvided['innerRef'];
}

const Album : React.FC<IAlbumProps> = (props) => {
  const onClick = (event: React.MouseEvent) => {
    if(props.onClick) {
      props.onClick(props.id);
      event.preventDefault();
    }
  }
  return (
    <div 
      onClick={onClick}
      onMouseDown={() => false}
      className={getAlbumClass(props.mode, props.isDraging, props.tier)}
      id={props.id}
      ref={props.innerRef}
    >
        <WebImage
          src={props.src}
          alt={getAlbumCoverAlt(props.name)}
          className='album-image'
          draggable={props.draggable}
        />
    </div>
  );
}

const getAlbumClass = (mode: AlbumMode, isDragging: boolean, tier?: TierName | null) => {
  let className = 'album';

  if(mode === AlbumMode.VIEW) {
    className += ' view';
  }

  if(isDragging) {
    className += ' dragging';
    return className;
  }

  if(tier) {
    className += ' tiered';
    className += ` ${tier}-tier`;
  }

  return className;
}

export default Album;