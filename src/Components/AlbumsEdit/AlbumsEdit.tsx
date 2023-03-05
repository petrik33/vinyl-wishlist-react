import * as React from 'react';
import { DragDropContext, DragUpdate, DraggableLocation, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import AlbumEditGroup from '../AlbumEditGroup/AlbumEditGroup';
import './AlbumsEdit.css'
import { AlbumsDispatch, AlbumsDispatchRedo, AlbumsDispatchReorder, AlbumsDispatchSetTier, AlbumsDispatchUndo, AlbumsSnapshot, TiersOrder } from '../../Context/AlbumsContext';
import { IAlbumsCollectionData, NoTierId, NoTierName, TierGroupId, TierNames, getTierById, getTierId } from '../../Data/Data';
import { Immutable } from 'immer';
import { AlbumsMapTiers, ITierGroup } from '../../Types/AlbumGroups';
import { deleteField, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import db, { albumsCollection, serverAdminDoc } from '../../Firebase/firebase';
import { SetStateBoolean, useLoggedIn, useSetLoggedIn } from '../../Context/LoginContext';

export interface IAlbumsEditProps {
  albumsSnap: Immutable<AlbumsSnapshot>;
  albumsDispatch: AlbumsDispatch;
}

const AlbumsEdit : React.FC<IAlbumsEditProps> = (props) => {
  const { data: albums, tiersOrder: order} 
    = {...props.albumsSnap};
  const albumsDispatch = props.albumsDispatch;
  const loggedIn = useLoggedIn();
  const setLoggedIn = useSetLoggedIn();

  const tierGroups = mapTierGroups(albums, order);

  const onDragEnd = (result: DragUpdate) => {
    dispatchDragResult(result.source, result.destination, props.albumsSnap, albumsDispatch);
  }

  const onShortCutPressed = React.useCallback(async (event: KeyboardEvent) => {
    if(!event.ctrlKey) {
      return;
    }

    if(event.key.toUpperCase() === 'S') {
      event.preventDefault();
      await postAlbums(albums, loggedIn, setLoggedIn);
      return;
    }

    if(event.key.toUpperCase() === 'Z') {
      AlbumsDispatchUndo(albumsDispatch);
      return;
    }

    if(event.key.toUpperCase() === 'Y') {
      AlbumsDispatchRedo(albumsDispatch);
    }
  }, [albumsDispatch, albums]);

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

const postAlbums = async (
  albums: IAlbumsCollectionData,
  loggedIn: boolean,
  setLoggedIn: SetStateBoolean
) => {
  if(!(await checkLogin(loggedIn, setLoggedIn))) {
    return false;
  }
  const albumDocs = await getDocs(query(albumsCollection));
  albumDocs.forEach(async (doc) => {
    const id = doc.id;
    const album = albums[id];
    const tier = album.data.tier;
    const update = {
      tier: tier ? tier : deleteField()
    }
    await updateDoc(doc.ref, update);
  })
}

const checkLogin = async (
  loggedIn: boolean,
  setLoggedIn: SetStateBoolean
) => {
  if(loggedIn) {
    return true;
  }
  let password = prompt(loginPropmt);
  while(password !== await getPassword()) {
    if(password === null) {
      return false;
    }
    password = prompt(tryAgainPropmt);
  }
  setLoggedIn(true);
  return true;
}

const getPassword = async () => {
  const doc = await getDoc(serverAdminDoc);
  return doc.data()?.password;
}

const mapAlbums = (
  albums: IAlbumsCollectionData,
  order: Immutable<TiersOrder>
) => {
  const albumsMap: AlbumsMapTiers = Object.create({});
  TierNames.forEach((tier) => {
    const id = getTierId(tier);
    albumsMap[id] = [];
  });
  albumsMap['No Tier'] = [];

  for(const tierId in order) {
    const orderGroup = order[tierId as TierGroupId];
    albumsMap[tierId as TierGroupId] =
      orderGroup.map((id) => {
        const album = albums[id];
        return album;
    })
  }

  return albumsMap;
}

const mapTierGroups = (
  albums: IAlbumsCollectionData,
  order: Immutable<TiersOrder>
) => {
  const albumsMap = mapAlbums(albums, order);
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

const loginPropmt = 'You have to login as a server administrator to save changes. Password?';

const tryAgainPropmt = 'Wrong password. Try again please:';

export default AlbumsEdit;