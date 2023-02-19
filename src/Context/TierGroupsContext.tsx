import * as React from 'react';
import { createContext, useContext } from 'react';
import { AlbumsData, IAlbumsData } from '../Data/Data';
import * as _ from "lodash";
// import { ImmerReducer, useImmerReducer } from 'use-immer';
// import { Immutable, current } from 'immer';
// import { Draft } from 'immer';

export const TierNames = ['S', 'A', 'B', 'C', 'D'] as const;
export type TierName = typeof TierNames[number];

export const NoTierId = 'No-Tier' as const;
export const NoTierName = 'Unranked' as const;

export type TierGroupId = TierName | typeof NoTierId;
export type Tier = TierName | null;

export type TierGroup = {
  name: string,
  id: TierGroupId,
  tier: Tier,
  albums: string[]
}

export type TierGroups = {
  [key in TierGroupId]: TierGroup;
}

export type TierGroupsHistory = TierGroups[];

export type TierGroupsState = {
  history: TierGroupsHistory,
  current: number
};

export type TierGroupsDispatch = React.Dispatch<TierGroupsAction>;

const TierGroupsContext = createContext<TierGroupsState>({} as TierGroupsState);
const TierGroupsDispatchContext = createContext<TierGroupsDispatch>(
  {} as TierGroupsDispatch);

export interface IProviderProps {
  children?: React.ReactNode;
}

export const TierGroupsProvider : React.FC<IProviderProps> = (props) => {
  const [tierGroups, dispatch] = React.useReducer(
    TierGroupsReducer,
    InitialTierGroupsState
  );

  return (
    <TierGroupsContext.Provider value={tierGroups}>
      <TierGroupsDispatchContext.Provider value={dispatch}>
        {props.children}
      </TierGroupsDispatchContext.Provider>
    </TierGroupsContext.Provider>
  );
}

export const useTierGroups = () => {
    const state = useContext(TierGroupsContext);
    return state.history[state.current];
}

export const useTierGroupsState = () => {
  return useContext(TierGroupsContext);
}

export const useTierGroupsDispatch = () => {
  return useContext(TierGroupsDispatchContext);
}

export enum TierGroupsActionKind {
  MOVE_ALBUM_IDX = 'move-album-idx',
  REORDER = 'reorder',
  DELETE_ALBUM_IDX = 'delete-album-idx',
  UNDO = 'undo',
  DO_AGAIN = 'do-again',
  RESET_TO_DEBUG = 'reset-to-debug'
};

export type TierGroupsActionMoveIndex = {
  type: TierGroupsActionKind.MOVE_ALBUM_IDX;
  sourceTier: TierName;
  sourceIndex: number;
  destinationTier: TierName;
  destinationIndex: number;
}

export type TierGroupsActionDeleteIndex = {
  type: TierGroupsActionKind.DELETE_ALBUM_IDX;
  sourceTier: TierName;
  sourceIndex: number;
}

export type TierGroupsActionUndo = {
  type: TierGroupsActionKind.UNDO;
}

export type TierGroupsActionDoAgain = {
  type: TierGroupsActionKind.DO_AGAIN;
}

export type TierGroupsActionResetToDebug = {
  type: TierGroupsActionKind.RESET_TO_DEBUG;
  parts: number;
}

export type TierGroupsActionReorder = {
  type: TierGroupsActionKind.REORDER;
  tier: TierName;
  sourceIndex: number;
  destinationIndex: number;
}

export type TierGroupsAction = 
  | TierGroupsActionMoveIndex
  | TierGroupsActionReorder
  | TierGroupsActionDeleteIndex
  | TierGroupsActionResetToDebug
  | TierGroupsActionUndo
  | TierGroupsActionDoAgain

const TierGroupsReducer : React.Reducer<TierGroupsState, TierGroupsAction> = (state, action) => {
	switch (action.type) {
		case TierGroupsActionKind.MOVE_ALBUM_IDX: {
      return TierGroupsMoveAlbumIdx(state, action);
		}

    case TierGroupsActionKind.REORDER: {
      return TierGroupsReorder(state, action);
    }

		case TierGroupsActionKind.DELETE_ALBUM_IDX: {
			return TierGroupsDeleteAlbumIdx(state, action);
		}

    case TierGroupsActionKind.UNDO: {
      return TierGroupsUndo(state, action);
    }

    case TierGroupsActionKind.DO_AGAIN: {
      return TierGroupsDoAgain(state, action);
    }

		case TierGroupsActionKind.RESET_TO_DEBUG: {
			return getDebugTierGroups(AlbumsData, action.parts);
		}

		default: {
			throw Error('Unknown action');
		}
	}
}

const TierGroupsMoveAlbumIdx = (
  state: TierGroupsState, action: TierGroupsActionMoveIndex) => {
    const current = state.current;
    const groups = state.history[current];

    const nextGroups = _.cloneDeep(groups);

    const sourceAlbums = groups[action.sourceTier].albums;
    const destAlbums = groups[action.destinationTier].albums;

    const movedAlbum = sourceAlbums[action.sourceIndex];

    const nextSourceAlbums = sourceAlbums.filter((id) => id !== movedAlbum);

    const nextDestAlbums = [
      ...destAlbums.slice(0, action.destinationIndex),
      movedAlbum,
      ...destAlbums.slice(action.destinationIndex)
    ];

    nextGroups[action.sourceTier].albums = nextSourceAlbums;
    nextGroups[action.destinationTier].albums = nextDestAlbums;

    const nextCurrent = current + 1;
    const nextHistory = [...state.history, nextGroups];

    return {
      history: nextHistory,
      current: nextCurrent
    }
}

const TierGroupsReorder = (
  state: TierGroupsState, action: TierGroupsActionReorder) => {
    const current = state.current;
    const groups = state.history[current];

    const nextGroups = _.cloneDeep(groups);

    const albums = groups[action.tier].albums;
    const reorderedAlbum = albums[action.sourceIndex];

    const nextAlbums = albums.filter((id) => id !== reorderedAlbum);

    nextAlbums.splice(action.destinationIndex, 0, reorderedAlbum);

    nextGroups[action.tier].albums = nextAlbums;

    const nextCurrent = current + 1;
    const nextHistory = [...state.history, nextGroups];

    return {
      history: nextHistory,
      current: nextCurrent
    }
}

const TierGroupsDeleteAlbumIdx = (
  state: TierGroupsState, action: TierGroupsActionDeleteIndex) => {
    const current = state.current;
    const groups = state.history[current];

    const nextGroups = _.cloneDeep(groups);

    const sourceAlbums = groups[action.sourceTier].albums;
    const deletedAlbum = sourceAlbums[action.sourceIndex];

    const nextSourceAlbums = sourceAlbums.filter((id) => id !== deletedAlbum);

    nextGroups[action.sourceTier].albums = nextSourceAlbums;

    const nextCurrent = current + 1;
    const nextHistory = [...state.history, nextGroups];

    return {
      history: nextHistory,
      current: nextCurrent
    }
}

const TierGroupsUndo = (
  state: TierGroupsState, action: TierGroupsActionUndo) => {
    const nextHistory = _.cloneDeep(state.history);
    const nextCurrent = Math.max(0, state.current - 1);
    return {
      history: nextHistory,
      current: nextCurrent
    }
}

const TierGroupsDoAgain = (
  state: TierGroupsState, action: TierGroupsActionDoAgain) => {
    const nextHistory = _.cloneDeep(state.history);
    const nextCurrent = Math.min(nextHistory.length - 1, state.current + 1);
    return {
      history: nextHistory,
      current: nextCurrent
    }
}

export const InitialTierGroups : TierGroups = {
	'S' : {
		name: 'S',
		id: 'S',
    tier: 'S',
		albums: []
	},
	'A' : {
		name: 'A',
		id: 'A',
		tier: 'A',
		albums: []
	},
	'B' : {
		name: 'B',
		id: 'B',
		tier: 'B',
		albums: []
	},
	'C' : {
		name: 'C',
		id: 'C',
		tier: 'C',
		albums: []
	},
	'D' : {
		name: 'D',
		id: 'D',
		tier: 'D',
		albums: []
	},
  'No-Tier' : {
    name: NoTierName,
    id: NoTierId,
    tier: null,
    albums: Object.keys(AlbumsData)
  }
}

export const InitialTierGroupsState : TierGroupsState = {
  history: [InitialTierGroups],
  current: 0
}

//Debug
const getDebugTierGroups = (data: IAlbumsData, parts: number) 
  : TierGroupsState => {
    const albumsNum = Object.keys(data).length;
    const minPerGroup = Math.floor(albumsNum / parts);

    let tierGroups: TierGroups = Object.create({});

    TierNames.forEach((tierName) => {
      const tierGroup = {
        id: tierName,
        name: tierName,
        tier: tierName,
        albums: []
      }

      tierGroups[tierName] = tierGroup;
    });

    tierGroups['No-Tier'] = {
      id: NoTierId,
      name: NoTierName,
      tier: null,
      albums: []
    }

    let counter = 0;
    for(const albumId in data) {
        const tierIdx = Math.floor(counter / minPerGroup);
        const tier = TierNames[tierIdx];
        tierGroups[tier].albums.push(albumId);
        counter++;
    }

    return {
      history: [tierGroups],
      current: 0
    };
}




