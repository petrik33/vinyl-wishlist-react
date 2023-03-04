import * as React from 'react';
import { createContext, useContext } from 'react';
import { AlbumsDebugData, IAlbumsCollectionData, Tier, TierGroupId, TierNames, getTierId } from '../Data/Data';
import { ImmerReducer, useImmerReducer} from 'use-immer';
import { Immutable } from 'immer';
import { moveArrayElement } from '../Utilities/ArrayUtilities';

export type TiersOrder = {
  [key in TierGroupId]: string[]
}

export type AlbumsSnapshot = {
  data: IAlbumsCollectionData,
  tiersOrder: TiersOrder
};

export type AlbumsHistory = AlbumsSnapshot[];

export type AlbumsState = Immutable<{
  history: AlbumsHistory,
  current: number
}>;

export type AlbumsDispatch = React.Dispatch<AlbumsAction>;

const AlbumsContext = 
  createContext<AlbumsState>({} as AlbumsState);

const AlbumsDispatchContext =
  createContext<AlbumsDispatch>({} as AlbumsDispatch);

export interface IProviderProps {
  children?: React.ReactNode;
}

export const AlbumsProvider : React.FC<IProviderProps> = (props) => {
  const [albums, dispatch] = useImmerReducer(
    AlbumsReducer,
    InitialAlbumsState
  );

  return (
    <AlbumsContext.Provider value={albums}>
      <AlbumsDispatchContext.Provider value={dispatch}>
        {props.children}
      </AlbumsDispatchContext.Provider>
    </AlbumsContext.Provider>
  );
}

export const useAlbumsState = () => {
  return useContext(AlbumsContext);
}

export const getCurrentAlbums = (state: AlbumsState) => {
    return state.history[state.current];
}

export const useAlbumsDispatch = () => {
  return useContext(AlbumsDispatchContext);
}

export enum AlbumsActionKind {
  SET_TIER = 'album-set-tier',
  UNDO = 'undo',
  REDO = 'redo',
  RESET_TO_DEBUG = 'reset-to-debug',
  LOAD = 'load',
  REORDER = 'reorder'
};

export const AlbumsDispatchLoad = (
  dispatch: AlbumsDispatch, 
  albumsCollectionData: IAlbumsCollectionData
) => {
  dispatch({
    type: AlbumsActionKind.LOAD,
    load: {
      albumsCollectionData: albumsCollectionData
    }
  })
}

export const AlbumsDispatchSetTier = (
  dispatch: AlbumsDispatch,
  id: string,
  tier: Tier,
  sourceIdx: number,
  destinationIdx: number
) => {
  dispatch({
    type: AlbumsActionKind.SET_TIER,
    load: {
      id: id,
      tier: tier,
      sourceIdx: sourceIdx,
      destintionIdx: destinationIdx
    }
  })
}

export const AlbumsDispatchUndo = (
  dispatch: AlbumsDispatch
) => {
  dispatch({
    type: AlbumsActionKind.UNDO
  })
}

export const AlbumsDispatchRedo = (
  dispatch: AlbumsDispatch
) => {
  dispatch({
    type: AlbumsActionKind.REDO
  })
}

export const AlbumsDispatchReorder = (
  dispatch: AlbumsDispatch,
  tierId: TierGroupId,
  sourceIdx: number,
  destinationIdx: number
) => {
  dispatch({
    type: AlbumsActionKind.REORDER,
    load: {
      sourceIdx: sourceIdx,
      destinationIdx: destinationIdx,
      tierId: tierId
    }
  })
}

export type AlbumsActionSetTier = {
  type: AlbumsActionKind.SET_TIER;
  load: {
    id: string;
    tier: Tier;
    sourceIdx: number;
    destintionIdx: number;
  }
}

export type AlbumsActionUndo = {
  type: AlbumsActionKind.UNDO;
}

export type AlbumsActionRedo = {
  type: AlbumsActionKind.REDO;
}

export type AlbumsActionResetToDebug = {
  type: AlbumsActionKind.RESET_TO_DEBUG;
  load: {
    parts: number;
  };
}

export type AlbumsActionLoad = {
  type: AlbumsActionKind.LOAD;
  load: {
    albumsCollectionData: IAlbumsCollectionData;
    tiersOrder?: TiersOrder
  }
}

export type AlbumsActionReorder = {
  type: AlbumsActionKind.REORDER;
  load: {
    tierId: TierGroupId,
    sourceIdx: number,
    destinationIdx: number
  }
}

export type AlbumsAction = 
  | AlbumsActionSetTier
  | AlbumsActionResetToDebug
  | AlbumsActionUndo
  | AlbumsActionRedo
  | AlbumsActionLoad
  | AlbumsActionReorder

const AlbumsReducer : ImmerReducer<AlbumsState, AlbumsAction> = (draft, action) => {
	switch (action.type) {
    case AlbumsActionKind.SET_TIER: {
      const current = draft.current;

      const nextAlbumsSnap = {...draft.history[current]};
      const {data: nextAlbums, tiersOrder: order} 
        = nextAlbumsSnap;

      const { tier, id, sourceIdx, destintionIdx } 
        = {...action.load};

      const sourceTier = nextAlbums[id].tier;
      nextAlbums[id].tier = tier;

      const sourceTierId = getTierId(sourceTier);
      order[sourceTierId].splice(sourceIdx, 1);

      const destTierId = getTierId(tier);
      order[destTierId].splice(destintionIdx, 0, id);

      draft.history = [
        ...draft.history.slice(0, current),
        nextAlbumsSnap
      ];

      break;
    }

    case AlbumsActionKind.UNDO: {
      draft.current = Math.max(0, draft.current - 1);
      break;
    }

    case AlbumsActionKind.REDO: {
      draft.current = Math.min(draft.current + 1, draft.history.length - 1);
      break;
    }

		case AlbumsActionKind.RESET_TO_DEBUG: {
      const current = draft.current;
      const nextAlbums = getDebugAlbums(action.load.parts);

      const nextAlbumsSnap : AlbumsSnapshot = {
        data: nextAlbums,
        tiersOrder: initializeTierOrder(nextAlbums)
      }

      draft.history = [
        ...draft.history.slice(0, current),
        nextAlbumsSnap
      ];
      break;
		}

    case AlbumsActionKind.LOAD: {
      const current = draft.current;
      const nextAlbums = action.load.albumsCollectionData;
      const nextAlbumsSnap : AlbumsSnapshot = {
        data: nextAlbums,
        tiersOrder: action.load.tiersOrder 
          ? action.load.tiersOrder 
          : initializeTierOrder(nextAlbums)
      }

      draft.history = [
        ...draft.history.slice(0, current),
        nextAlbumsSnap
      ];
      break;
    }

    case AlbumsActionKind.REORDER: {
      const current = draft.current;
      const nextAlbumsSnap = {...draft.history[current]};
      const nextOrder = nextAlbumsSnap.tiersOrder;

      const { destinationIdx, sourceIdx, tierId } 
        = {...action.load};

      let tierOrder = nextOrder[tierId];
      if(!tierOrder) {
        
      }
      
      moveArrayElement(
        tierOrder, sourceIdx, destinationIdx);

      draft.history = [
        ...draft.history.slice(0, current),
        nextAlbumsSnap
      ];
      break;
    }

		default: {
			throw Error('Unknown action');
		}
	}
}

const initializeTierOrder = (
  albums: IAlbumsCollectionData
) => {
  const tierOrder: TiersOrder = Object.create({});
  TierNames.forEach((name) => {
    tierOrder[name] = [];
  })
  tierOrder['No Tier'] = [];
  for(const id in albums) {
    const album = albums[id];
    const tierId = getTierId(album.tier);
    tierOrder[tierId].push(id);
  }
  return tierOrder;
}

const InitialAlbumsState : AlbumsState = {
  history: [{
    data: {},
    tiersOrder: initializeTierOrder({})
  }],
  current: 0
}

//Debug
const getDebugAlbums = (parts: number) 
  : IAlbumsCollectionData => {
    const albumsNum = Object.keys(AlbumsDebugData).length;
    const minPerGroup = Math.floor(albumsNum / parts);

    let Albums: IAlbumsCollectionData = Object.create({});

    let counter = 0;
    for(const albumId in AlbumsDebugData) {
        const tierIdx = Math.floor(counter / minPerGroup);
        const tier = TierNames[tierIdx];
        Albums[albumId] = {
          ...AlbumsDebugData[counter],
          tier: tier
        };
        counter++;
    }

    return Albums;
}




