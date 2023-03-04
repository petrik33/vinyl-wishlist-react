import * as React from 'react';
import { DragDropContext, DragUpdate, DraggableLocation, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import AlbumEditGroup from '../AlbumEditGroup/AlbumEditGroup';
import './AlbumsEdit.css'
import { AlbumsDispatch, AlbumsDispatchRedo, AlbumsDispatchReorder, AlbumsDispatchSetTier, AlbumsDispatchUndo, AlbumsSnapshot } from '../../Context/AlbumsContext';
import { IAlbumsCollectionData, NoTierId, NoTierName, TierGroupId, TierNames, getTierById, getTierId } from '../../Data/Data';
import { Immutable } from 'immer';
import { AlbumsMapTiers, ITierGroup } from '../../Types/AlbumGroups';

export interface IAlbumsEditProps {
  albumsSnap: Immutable<AlbumsSnapshot>;
  albumsDispatch: AlbumsDispatch;
}

const AlbumsEdit : React.FC<IAlbumsEditProps> = (props) => {
  const albums = props.albumsSnap.data;
  const albumsDispatch = props.albumsDispatch;

  const tierGroups = mapTierGroups(albums);

  const onDragEnd = (result: DragUpdate) => {
    dispatchDragResult(result.source, result.destination, props.albumsSnap, albumsDispatch);
  }

  const onShortCutPressed = React.useCallback((event: KeyboardEvent) => {
    if(!event.ctrlKey) {
      return;
    }

    if(event.key.toUpperCase() === 'Z') {
      AlbumsDispatchUndo(albumsDispatch);
      return;
    }

    if(event.key.toUpperCase() === 'Y') {
      AlbumsDispatchRedo(albumsDispatch);
    }
  }, [albumsDispatch]);

  React.useEffect(() => {
    document.addEventListener('keydown', onShortCutPressed);
    return () => {
      document.removeEventListener('keydown', onShortCutPressed);
    };
  }, [onShortCutPressed]);

  return (
    <div className='edit-groups-container'>
      <DragDropContext  onDragEnd={onDragEnd}> 
        {tierGroups}
      </DragDropContext>
    </div>
  );
}

const mapAlbums = (albums: IAlbumsCollectionData) => {
  const albumsMap: AlbumsMapTiers = Object.create({});
  TierNames.forEach((tier) => {
    const id = getTierId(tier);
    albumsMap[id] = [];
  });
  albumsMap['No Tier'] = [];

  for(const id in albums) {
    const album = albums[id];
    const tierId = getTierId(album.tier);
    albumsMap[tierId].push(album);
  }

  return albumsMap;
}

const mapTierGroups = (albums: IAlbumsCollectionData) => {
  const albumsMap = mapAlbums(albums);
  const tierGroupsArray = initializeTierGroups(albumsMap);
  const tierGroups = tierGroupsArray.map((group) => {
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
  })
  return tierGroups;
}

const initializeTierGroups = (
  albumsMap: AlbumsMapTiers
) => {
  const tierGroupsArray: ITierGroup[] = [];
  TierNames.forEach((tier) => {
    const id = getTierId(tier);
    tierGroupsArray.push({
      id: id,
      albums: albumsMap[id],
      name: tier,
      tier: tier
    })
  });
  tierGroupsArray.push({
    id: NoTierId,
    albums: albumsMap[NoTierId],
    name: NoTierName,
    tier: null
  });
  
  return tierGroupsArray;
}

const dispatchDragResult = (
  source: DraggableLocation,
  destination: DraggableLocation | null | undefined,
  albumsSnap: Immutable<AlbumsSnapshot>,
  dispatch: AlbumsDispatch) => {
    if(!destination) {
      return;
    }

    if(droppedBack(source, destination)) {
      return;
    }

    const sourceTierId = source.droppableId as TierGroupId;
    const id = 
      albumsSnap.tiersOrder[sourceTierId][source.index];

    if(source.droppableId === destination.droppableId) {
      AlbumsDispatchReorder(
        dispatch,
        sourceTierId,
        source.index,
        destination.index
      );

      return;
    }

    const destinationTierId = destination.droppableId as TierGroupId;

    AlbumsDispatchSetTier(
      dispatch,
      id,
      getTierById(destinationTierId),
      source.index,
      destination.index
    )
}

const droppedBack = (source : DraggableLocation,
  destination: DraggableLocation) => {
    return (destination.droppableId === source.droppableId &&
      destination.index === source.index);
}

export default AlbumsEdit;