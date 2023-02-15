import * as React from 'react';
import { TierGroup, TierName } from '../../Context/TierGroupsContext';
import { AlbumsData } from '../../Data/Data';
import Album from '../Album/Album';
import './AlbumEditGroup.css';
import { Draggable, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

export interface IAlbumEditGroupProps extends TierGroup {
  innerRef?: DroppableProvided['innerRef'];
  droppablePlaceHolder?: React.ReactNode;
}

const AlbumEditGroup : React.FC<IAlbumEditGroupProps> = (props) => {
  const albumItems = mapAlbumItems(props.albums, props.id);

  return (
    <div className='album-group'>
      <div ref={props.innerRef} className='album-group-items-container'>
        {albumItems}
        {props.droppablePlaceHolder}
      </div>
      <div className='album-group-name'>{props.name}</div>
    </div>
  );
}

const mapAlbumItems = (albums: readonly string[], tier: TierName) => {
  if(albums.length === 0) {
    return null;
  }

  return albums.map((album, idx) => {
    const albumData = AlbumsData[album];
    return (
      <Draggable draggableId={album} index={idx} key={album}>
        {(provided: DraggableProvided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            key={album}
          >
            <Album
              innerRef={provided.innerRef}
              {...albumData}
              draggable={true}
              tier={tier}
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