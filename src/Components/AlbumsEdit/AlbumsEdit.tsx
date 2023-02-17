import * as React from 'react';
import { NoTierId, TierGroup, TierGroupsActionKind, TierGroupsState, TierName, TierNames, useTierGroups, useTierGroupsDispatch } from '../../Context/TierGroupsContext';
import { DragDropContext, DragUpdate, DraggableLocation, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import AlbumEditGroup from '../AlbumEditGroup/AlbumEditGroup';
import './AlbumsEdit.css'

export interface IAlbumsEditProps {
  
}

const AlbumsEdit : React.FC<IAlbumsEditProps> = (props) => {
  const tierGroups = useTierGroups();
  const tierGroupsDispatch = useTierGroupsDispatch();
  const albumGroups = mapTiers(tierGroups);

  const onDragEnd = (result: DragUpdate) => {
    const { source, destination } = result;

    if(!destination) {
      return;
    }

    if(droppedBack(source, destination)) {
      return;
    }

    tierGroupsDispatch({
      type: TierGroupsActionKind.MOVE_ALBUM_IDX,
      sourceTier: source.droppableId as TierName,
      sourceIndex: source.index,
      destinationTier: destination.droppableId as TierName,
      destinationIndex: destination.index
    })

  }

  return (
    <div className='edit-groups-container'>
      <DragDropContext  onDragEnd={onDragEnd}> 
        {albumGroups}
      </DragDropContext>
    </div>
  );
}

const mapTiers = (tierGroupsState: TierGroupsState) => {
  const namedGroups = mapTierNames(tierGroupsState);
  const noTierGroup = mapTierGroup(tierGroupsState[NoTierId]);
  return [...namedGroups, noTierGroup];
}

const mapTierNames = (tierGroupsState: TierGroupsState) => {
  return TierNames.map((tier) => {
    return mapTierGroup(tierGroupsState[tier]);
  });
}

const mapTierGroup = (group: TierGroup) => {
  return (
    <Droppable direction='horizontal' droppableId={group.id} key={group.id}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <AlbumEditGroup
          {...group}
          innerRef={provided.innerRef}
          {...provided.droppableProps}
          droppablePlaceHolder={provided.placeholder}
          isDraggingOver={snapshot.isDraggingOver}
          key={group.id}
        />
      )}
    </Droppable>
  )
}

const droppedBack = (source : DraggableLocation,
  destination: DraggableLocation) => {
    return (destination.droppableId === source.droppableId &&
      destination.index === source.index);
}

export default AlbumsEdit;