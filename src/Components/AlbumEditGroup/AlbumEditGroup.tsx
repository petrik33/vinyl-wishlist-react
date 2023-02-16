import * as React from 'react';
import { TierGroup, TierName } from '../../Context/TierGroupsContext';
import { AlbumsData } from '../../Data/Data';
import Album from '../Album/Album';
import './AlbumEditGroup.css';
import { Draggable, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';

export interface IAlbumEditGroupProps extends TierGroup {
  isDraggingOver: boolean;
  innerRef?: DroppableProvided['innerRef'];
  droppablePlaceHolder?: React.ReactNode;
}

const AlbumEditGroup : React.FC<IAlbumEditGroupProps> = (props) => {
  const albumItems = mapAlbumItems(props.albums, props.id);

  return (
    <div className='album-group'>
      <div ref={props.innerRef} className={getGroupClass(props.isDraggingOver)}>
        {albumItems}
        {props.droppablePlaceHolder}
      </div>
      <div 
        style={getTierStyle(props.id)}
        className='album-group-name'
      >
        {props.name}
      </div>
    </div>
  );
}

const getGroupClass = (isDraggingOver: boolean) => {
  let className = 'album-group-items-container';
  
  if(isDraggingOver) {
    className += ' dragged-over';
  }

  return className;
}

const getTierStyle = (tier: TierName | null) : React.CSSProperties => {
  let shadowColor : string;
  if(!tier) {
    shadowColor = 'inactive';
  } else {
    shadowColor = `tier-${tier}`;
  }

  const colorProp = `var(--${shadowColor}-color)`;

  return {
    color: colorProp
  }

  // const boxShadowProp = `var(--shadow-x-offset) var(--shadow-y-offset) var(--shadow-blur) var(--shadow-spread) var(--${shadowColor}-color)`;

  // return {
  //   boxShadow: boxShadowProp
  // }
}

const mapAlbumItems = (albums: readonly string[], tier: TierName) => {
  if(albums.length === 0) {
    return null;
  }

  return albums.map((album, idx) => {
    const albumData = AlbumsData[album];
    return (
      <Draggable draggableId={album} index={idx} key={album}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            key={album}
          >
            <Album
              {...albumData}
              tier={tier}
              innerRef={provided.innerRef}
              draggable={true}
              isDraging={snapshot.isDragging}
              onClick={() => false}
              key={album}
            />
          </div>
        )}
      </Draggable>
    );
  });
}

export default AlbumEditGroup;