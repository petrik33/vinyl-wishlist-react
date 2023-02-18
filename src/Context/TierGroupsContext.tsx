import * as React from 'react';
import { createContext, useContext } from 'react';
import { AlbumsData, IAlbumsData } from '../Data/Data';
import { ImmerReducer, useImmerReducer } from 'use-immer';
import { Immutable } from 'immer';
import { Draft } from 'immer';

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
  albums: readonly string[]
}

export type TierGroups = {
  [key in TierGroupId]: TierGroup;
}

export type TierGroupsState = Immutable<TierGroups>;
export type TierGroupsDispatch = React.Dispatch<TierGroupsAction>;

const TierGroupsContext = createContext<TierGroupsState>({} as TierGroupsState);
const TierGroupsDispatchContext = createContext<TierGroupsDispatch>(
  {} as TierGroupsDispatch);

export interface IProviderProps {
  children?: React.ReactNode;
}

export const TierGroupsProvider : React.FC<IProviderProps> = (props) => {
  const [tierGroups, dispatch] = useImmerReducer(
    TierGroupsReducer,
    InitialTierGroups
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
    return useContext(TierGroupsContext);
}

export const useTierGroupsDispatch = () => {
  return useContext(TierGroupsDispatchContext);
}

export enum TierGroupsActionKind {
  MOVE_ALBUM_IDX = 'move-album-idx',
  DELETE_ALBUM_IDX = 'delete-album-idx',
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

export type TierGroupsActionResetToDebug = {
  type: TierGroupsActionKind.RESET_TO_DEBUG;
  parts: number;
}

export type TierGroupsAction = 
  | TierGroupsActionMoveIndex
  | TierGroupsActionDeleteIndex
  | TierGroupsActionResetToDebug

const TierGroupsReducer : ImmerReducer<TierGroupsState, TierGroupsAction> = (tierGroupsDraft, action) => {
	switch (action.type) {
		case TierGroupsActionKind.MOVE_ALBUM_IDX: {
			const sourceAlbums = tierGroupsDraft[action.sourceTier].albums;
      const destAlbums = tierGroupsDraft[action.destinationTier].albums;

      const movedAlbum = sourceAlbums[action.sourceIndex];

      sourceAlbums.splice(action.sourceIndex, 1);
      destAlbums.splice(action.destinationIndex, 0, movedAlbum);
		}

    break;

		case TierGroupsActionKind.DELETE_ALBUM_IDX: {
			const sourceAlbums = tierGroupsDraft[action.sourceTier].albums;
      sourceAlbums.splice(action.sourceIndex, 1);
		}

    break;

		case TierGroupsActionKind.RESET_TO_DEBUG: {
			return getDebugTierGroups(AlbumsData, action.parts);
		}

		default: {
			throw Error('Unknown action');
		}
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

//Debug
const getDebugTierGroups = (data: IAlbumsData, parts: number) : TierGroups => {
  const albumsNum = Object.keys(data).length;
  const minPerGroup = Math.floor(albumsNum / parts);

  let tierGroups: Draft<TierGroupsState> = {
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
      albums: []
    }
	};

  let counter = 0;
  for(const albumId in data) {
      const tierIdx = Math.floor(counter / minPerGroup);
      const tier = TierNames[tierIdx];
      tierGroups[tier].albums.push(albumId);
			counter++;
  }

  return tierGroups;
}




