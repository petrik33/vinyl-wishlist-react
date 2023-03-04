import * as React from 'react';
import Album from '../Album/Album';
import './AlbumEditGroup.css';
import { Draggable, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';
import { ITierGroup } from '../../Types/AlbumGroups';
import { IAlbum, Tier } from '../../Data/Data';

export interface IAlbumEditGroupProps extends ITierGroup {
  isDraggingOver: boolean;
  innerRef?: DroppableProvided['innerRef'];
  droppablePlaceHolder?: React.ReactNode;
}

const AlbumEditGroup : React.FC<IAlbumEditGroupProps> = (props) => {
  const albumItems = mapAlbumItems(props.albums, props.tier);

  return (
    <div className={getGroupClass(props.tier, props.isDraggingOver)}>
      {props.tier !== null && (
        <div className={getGroupNameClass(props.tier)}>
          {props.name}
        </div>
      )}
      <div ref={props.innerRef} className={getGroupContainerClass()}>
        {albumItems}
        {props.droppablePlaceHolder}
      </div>
    </div>
  );
}

const mapAlbumItems = (
  albums: readonly IAlbum[], tier: Tier
) => {
  if(albums.length === 0) {
    return null;
  }

  return albums.map((album, idx) => {
    return (
      <Draggable 
        draggableId={album.id} 
        index={idx} 
        key={album.id}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          return (
            <div
              className={
                getDraggableClass(snapshot.isDragging)
              }
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              key={album.id}
            >
              <Album
                edit={true}
                {...album}
                tier={null}
                draggable={true}
                key={album.id}
              />
            </div>
          )}
        }
      </Draggable>
    );
  });
}

const getGroupClass = (tier: Tier, isDraggingOver: boolean) => {
  let className = 'album-group edit';

  if(tier) {
    className += ` tiered ${tier}-tier`;
  } else {
    className += ' no-tier';
  }
  
  if(isDraggingOver) {
    className += ' dragged-over';
  }

  return className;
}

const getGroupContainerClass = () => {
  let className = 'albums-container edit';
  return className;
}

const getGroupNameClass = (tier: Tier) => {
  let className = 'album-group-name';

  if(tier) {
    className += ' tiered';
    className += ` ${tier}-tier`;
  }

  return className;
}

const getDraggableClass = (isDragging: boolean) => {
  let className = 'album-draggable';

  if(isDragging) {
    className += ' dragged';
  }

  return className;
}

export default AlbumEditGroup;