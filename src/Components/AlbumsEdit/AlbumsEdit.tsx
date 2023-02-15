import * as React from 'react';
import { TierGroupsState, TierNames, useTierGroups } from '../../Context/TierGroupsContext';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import AlbumEditGroup from '../AlbumEditGroup/AlbumEditGroup';

export interface IAlbumsEditProps {
  
}

const AlbumsEdit : React.FC<IAlbumsEditProps> = (props) => {
  const tierGroups = useTierGroups();
  const albumGroups = mapTierGroups(tierGroups);

  return (
    <div >
      {/* debug */}
      <DragDropContext  onDragEnd={() => false}> 
        {albumGroups}
      </DragDropContext>
    </div>
  );
}

const mapTierGroups = (tierGroups: TierGroupsState) => {
  return TierNames.map((tier) => {
    const group = tierGroups[tier];
    return (
      <Droppable direction='horizontal' droppableId={group.id} key={group.id}>
        {(provided: DroppableProvided) => (
          <AlbumEditGroup
            {...group}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            droppablePlaceHolder={provided.placeholder}
            key={group.id}
          />
        )}
      </Droppable>
    )
  });
}

export default AlbumsEdit;