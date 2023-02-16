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
  isDraging: boolean;
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
      className={getAlbumClass(props.isDraging, props.tier)}
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

const getAlbumClass = (isDragging: boolean, tier?: TierName | null) => {
  let className = 'album';

  if(isDragging) {
    className += ' dragging';
  }

  if(tier) {
    className += ' tiered';
    className += ` ${tier}-tier`;
  }

  return className;
}

export default Album;