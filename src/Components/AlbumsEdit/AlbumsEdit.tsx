import * as React from 'react';
import { TierNames, useTierGroups } from '../../Context/TierGroupsContext';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import AlbumEditGroup from '../AlbumEditGroup/AlbumEditGroup';

export interface IAlbumsEditProps {
  
}

const AlbumsEdit : React.FC<IAlbumsEditProps> = (props) => {
  const tierGroups = useTierGroups();

  const albumGroups = TierNames.map((tier) => {
    const group = tierGroups[tier];

    return (
      <Droppable direction='horizontal' key={group.id} droppableId={group.id}>
        {(provided: DroppableProvided) => (
          <AlbumEditGroup
            {...group}
            key={group.id}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            droppablePlaceHolder={provided.placeholder}
          />
        )}
      </Droppable>
    )
  })

  return (
    <div >
      {/* debug */}
      <DragDropContext  onDragEnd={() => false}> 
        {albumGroups}
      </DragDropContext>
    </div>
  );
}

export default AlbumsEdit;