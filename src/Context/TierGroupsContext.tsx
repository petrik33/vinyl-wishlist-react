import * as React from 'react';
import { createContext, useContext } from 'react';
import { AlbumsData, IAlbumsData } from '../Data/Data';
import { filterId } from '../Utilities/FilterUtilities';
import { ImmerReducer, useImmerReducer } from 'use-immer';
import { Immutable } from 'immer';
import { Draft } from 'immer';

export const TierNames = ['S', 'A', 'B', 'C', 'D'] as const;

export type TierName = typeof TierNames[number];
export type TierGroup = {
  name: string,
  id: TierName,
  albums: string[]
}
export type TierGroups = {
  [key in TierName]: TierGroup;
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
  MOVE_ALBUM = 'move-album',
  DELETE_ALBUM = 'delete-album',
  RESET_TO_DEBUG = 'reset-to-debug'
};
export type TierGroupsActionMove = {
  type: TierGroupsActionKind.MOVE_ALBUM;
  id: string;
  from: TierName;
  to: TierName;
}
export type TierGroupsActionDelete = {
  type: TierGroupsActionKind.DELETE_ALBUM;
  id: string;
  from: TierName;
}
export type TierGroupsActionResetToDebug = {
  type: TierGroupsActionKind.RESET_TO_DEBUG;
  parts: number;
}
export type TierGroupsAction = 
  | TierGroupsActionMove
  | TierGroupsActionDelete
  | TierGroupsActionResetToDebug

const TierGroupsReducer : ImmerReducer<TierGroupsState, TierGroupsAction> = (tierGroupsDraft, action) => {
	switch (action.type) {
		case TierGroupsActionKind.MOVE_ALBUM: {
			return TierGroupsMoveAlbum(tierGroupsDraft, action);
		}

		case TierGroupsActionKind.DELETE_ALBUM: {
			return TierGroupsDeleteAlbum(tierGroupsDraft, action);
		}

		case TierGroupsActionKind.RESET_TO_DEBUG: {
			return getDebugTierGroups(AlbumsData, action.parts);
		}

		default: {
			throw Error('Unknown action');
		}
	}
}

const TierGroupsDeleteAlbum = (tierGroupsDraft: Draft<TierGroupsState>,
	action : TierGroupsActionDelete) : TierGroupsState => {
    const fromAlbums = tierGroupsDraft[action.from].albums;
    const id = action.id;
    
    tierGroupsDraft[action.from].albums = filterId(fromAlbums, id);

    return tierGroupsDraft;
}

const TierGroupsMoveAlbum = (tierGroupsDraft: Draft<TierGroupsState>,
	action: TierGroupsActionMove) : TierGroupsState => {
		const fromAlbums = tierGroupsDraft[action.from].albums;
		const toAlbums = tierGroupsDraft[action.to].albums;
		const id = action.id;

		tierGroupsDraft[action.from].albums = filterId(fromAlbums, id);
		toAlbums.push(id);

		return tierGroupsDraft;
}

export const InitialTierGroups : TierGroups = {
	'S' : {
		name: 'S',
		id: 'S',
		albums: []
	},
	'A' : {
		name: 'A',
		id: 'A',
		albums: []
	},
	'B' : {
		name: 'B',
		id: 'B',
		albums: []
	},
	'C' : {
		name: 'C',
		id: 'C',
		albums: []
	},
	'D' : {
		name: 'D',
		id: 'D',
		albums: []
	}
}

//Debug
const getDebugTierGroups = (data: IAlbumsData, parts: number) : TierGroups => {
  const albumsNum = Object.keys(data).length;
  const minPerGroup = Math.floor(albumsNum / parts);

  let tierGroups: TierGroups = {
		'S' : {
			name: 'S',
			id: 'S',
			albums: []
		},
		'A' : {
			name: 'A',
			id: 'A',
			albums: []
		},
		'B' : {
			name: 'B',
			id: 'B',
			albums: []
		},
		'C' : {
			name: 'C',
			id: 'C',
			albums: []
		},
		'D' : {
			name: 'D',
			id: 'D',
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




