import * as React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { IAlbum } from '../Data';

export const AlbumTiers = ['S', 'A', 'B', 'C', 'D'] as const;
export type AlbumTier = typeof AlbumTiers[number] | null;

//Debug
const initialAlbums: Album[] = splitAlbumData(DATA_ALBUMS, 5);

export type AlbumsState = Album[] | null;
export type AlbumsDispatch = React.Dispatch<AlbumsAction> | null;

const AlbumsContext = createContext<AlbumsState>(initialAlbums);
const AlbumsDispatchContext = createContext<AlbumsDispatch>(null);

export interface IProviderProps {
    children?: React.ReactNode;
}

export function AlbumsProvider(props: IProviderProps) {
  const [albums, dispatch] = useReducer(
    AlbumsReducer,
    initialAlbums
  );

  return (
    <AlbumsContext.Provider value={albums}>
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

//Debug
function splitAlbumData(data: AlbumData[], parts: number) {
    let albumsNum = data.length;
    let albumSplit = Math.floor(albumsNum / parts);

    let albums: Album[] = Array(albumsNum);

    for(let i = 0; i < albumsNum; i++) {
        let tier: AlbumTier = null;
        let dataPart = Math.floor(i / albumSplit);
        if(dataPart < AlbumTiers.length || dataPart > 0) {
            tier = AlbumTiers[dataPart];
        }

        let albumData = data[i];
        let album = new Album(albumData, tier);
        
        albums[i] = album;
    }

    return albums;
}




