import * as React from 'react';
import { Tier, TierGroup, TierName } from '../../Context/TierGroupsContext';
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
  const albumItems = mapAlbumItems(props.albums, props.tier);

  return (
    <div className={getGroupClass(props.isDraggingOver)}>
      <div ref={props.innerRef} className={getGroupContainerClass()}>
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
  let className = 'album-group';
  
  if(isDraggingOver) {
    className += ' dragged-over';
  }

  return className;
}

const getGroupContainerClass = () => {
  let className = 'album-group-items-container';
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
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          return (
            <div
              className={getDraggableClass(snapshot.isDragging)}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              key={album}
            >
              <Album
                {...albumData}
                tier={getAlbumTier(
                  tier,
                  snapshot.isDragging,
                  snapshot.isDropAnimating
                )}
                draggable={true}
                key={album}
              />
            </div>
          )}
        }
      </Draggable>
    );
  });
}

// const getDropAnimationStyle = (snapshot: DraggableStateSnapshot) => {
//   if (!snapshot.isDropAnimating) {
//     return {};
//   }

//   return {
    
//   }
// }

const getDraggableClass = (isDragging: boolean) => {
  let className = 'album-draggable';

  if(isDragging) {
    className += ' dragged';
  }

  return className;
}

const getAlbumTier = (groupTier: Tier, isDragging: boolean,
  isDropAnimating: boolean) => {
    let tier = groupTier;

    if(isDragging || isDropAnimating) {
      tier = null;
    }

    return tier;
}

export default AlbumEditGroup;