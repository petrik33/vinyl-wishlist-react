import * as React from 'react';
import { NoTierId, TierGroup, TierGroups, TierGroupsActionKind, TierGroupsDispatch, TierName, TierNames, useTierGroups, useTierGroupsDispatch } from '../../Context/TierGroupsContext';
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
    dispatchDragResult(result.source, result.destination, tierGroupsDispatch);
  }

  const onShortCutPressed = React.useCallback((event: KeyboardEvent) => {
    if(!event.ctrlKey) {
      return;
    }

    if(event.key.toUpperCase() === 'Z') {
      dispatchUndo(tierGroupsDispatch);
      return;
    }

    if(event.key.toUpperCase() === 'Y') {
      dispatchDoAgain(tierGroupsDispatch);
    }
  }, [tierGroupsDispatch]);

  React.useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', onShortCutPressed);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', onShortCutPressed);
    };
  }, [onShortCutPressed]);

  return (
    <div className='edit-groups-container'>
      <DragDropContext  onDragEnd={onDragEnd}> 
        {albumGroups}
      </DragDropContext>
    </div>
  );
}

const mapTiers = (tierGroups: TierGroups) => {
  const namedGroups = mapTierNames(tierGroups);
  const noTierGroup = mapTierGroup(tierGroups[NoTierId]);
  return [...namedGroups, noTierGroup];
}

const mapTierNames = (tierGroups: TierGroups) => {
  return TierNames.map((tier) => {
    return mapTierGroup(tierGroups[tier]);
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

const dispatchUndo = (
  dispatch: TierGroupsDispatch
) => {
  dispatch({
    type: TierGroupsActionKind.UNDO
  });
}

const dispatchDoAgain = (
  dispatch: TierGroupsDispatch
) => {
  dispatch({
    type: TierGroupsActionKind.DO_AGAIN
  });
}

const dispatchDragResult = (
  source: DraggableLocation,
  destination: DraggableLocation | null | undefined,
  dispatch: TierGroupsDispatch) => {
    if(!destination) {
      return;
    }

    if(droppedBack(source, destination)) {
      return;
    }

    if(source.droppableId === destination.droppableId) {
      dispatch({
        type: TierGroupsActionKind.REORDER,
        tier: source.droppableId as TierName,
        sourceIndex: source.index,
        destinationIndex: destination.index
      });

      return;
    }

    dispatch({
      type: TierGroupsActionKind.MOVE_ALBUM_IDX,
      sourceTier: source.droppableId as TierName,
      sourceIndex: source.index,
      destinationTier: destination.droppableId as TierName,
      destinationIndex: destination.index
    });
}

const droppedBack = (source : DraggableLocation,
  destination: DraggableLocation) => {
    return (destination.droppableId === source.droppableId &&
      destination.index === source.index);
}

export default AlbumsEdit;