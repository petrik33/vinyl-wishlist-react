import * as React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { AlbumData } from '../Data';
export type AlbumRank = 
    'S' | 'A' | 'B' | 'C' | 'D' | null; 

export class Album extends AlbumData {
    rank: AlbumRank;
    constructor (name: string, coverSrc: string, rank = null) {
        super(name, coverSrc);
        this.rank = rank;
    }
}

export type AlbumsState = Album[] | null;
export type AlbumsDispatch = React.Dispatch<AlbumsAction> | null;

export const AlbumsContext = createContext<AlbumsState>(null);
export const AlbumsDispatchContext = createContext<AlbumsDispatch>(null);

export interface IAlbumsProviderProps {
    children?: React.ReactNode;
}

export function AlbumsProvider(props: IAlbumsProviderProps) {
  const [Albums, dispatch] = useReducer(
    AlbumsReducer,
    initialAlbums
  );

  return (
    <AlbumsContext.Provider value={Albums}>
      <AlbumsDispatchContext.Provider value={dispatch}>
        {props.children}
      </AlbumsDispatchContext.Provider>
    </AlbumsContext.Provider>
  );
}

export function useAlbums() {
    return useContext(AlbumsContext);
}

export function useTasksDispatch() {
    return useContext(AlbumsDispatchContext);
}

export enum AlbumsActionKind {
    EDIT = 'edit',
    DELETE = 'delete'
};

export type AlbumsActionEdit = {
    type: AlbumsActionKind.EDIT;
    changes: Partial<Album>;
    id: number;
}

export type AlbumsActionDelete = {
    type: AlbumsActionKind.DELETE;
    id: number;
}

export type AlbumsAction = 
    | AlbumsActionEdit
    | AlbumsActionDelete

function AlbumsReducer(Albums: AlbumsState, action : AlbumsAction)
: AlbumsState {
    if(!Albums) {
        return null;
    }
    switch (action.type) {
        case AlbumsActionKind.EDIT: {
            return Albums.map((album, idx) => {
                if(album.id !== action.id) {
                    return album;
                }
                let editedAlbum = {
                    ...album,
                    ...action.changes
                }
                return editedAlbum;
            })
        }

        case AlbumsActionKind.DELETE: {
            return Albums.filter((album) => album.id !== action.id);
        }

        default: {
            throw Error('Unknown action');
        }
    }
}

const initialAlbums: Album[] = [];