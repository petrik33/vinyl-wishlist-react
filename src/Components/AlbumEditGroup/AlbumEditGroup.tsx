import * as React from 'react';
import { Tier, TierGroup, TierName } from '../../Context/TierGroupsContext';
import { AlbumsData } from '../../Data/Data';
import Album, { AlbumMode } from '../Album/Album';
import './AlbumEditGroup.css';
import { Draggable, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';

export interface IAlbumEditGroupProps extends TierGroup {
  isDraggingOver: boolean;
  innerRef?: DroppableProvided['innerRef'];
  droppablePlaceHolder?: React.ReactNode;
}

const AlbumEditGroup : React.FC<IAlbumEditGroupProps> = (props) => {
  const albumItems = mapAlbumItems(props.albums, props.tier);

  return (
    <div className='album-group'>
      <div ref={props.innerRef} className={getGroupClass(props.isDraggingOver)}>
        {albumItems}
        {props.droppablePlaceHolder}
      </div>
      <div 
        className={getGroupNameClass(props.tier)}
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

const getGroupNameClass = (tier: TierName | null) => {
  let className = 'album-group-name tiered';

  if(tier) {
    className += ` ${tier}-tier`;
  }

  return className;
}

const mapAlbumItems = (albums: readonly string[], tier: Tier) => {
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
              mode={AlbumMode.EDIT}
              innerRef={provided.innerRef}
              draggable={true}
              isDraging={snapshot.isDragging}
              key={album}
            />
          </div>
        )}
      </Draggable>
    );
  });
}

export default AlbumEditGroup;