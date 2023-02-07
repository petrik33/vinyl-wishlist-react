import { create } from 'domain';
import * as React from 'react';
import { useState } from 'react';
import { createContext, useReducer, useContext } from 'react';
import { IProviderProps } from './AlbumsContext';

const initialId = -1;
const initialSetter = {} as React.Dispatch<React.SetStateAction<number>>;

const AlbumModalViewIdContext = createContext(initialId);
const SetAlbumModalViewIdContext = createContext(initialSetter);

export default function AlbumModalViewIdProvider(props: IProviderProps) {
    const [albumId, setAlbumId] = useState(initialId);

    return (
        <AlbumModalViewIdContext.Provider value={albumId}>
            <SetAlbumModalViewIdContext.Provider value={setAlbumId}>
                {props.children}
            </SetAlbumModalViewIdContext.Provider>
        </AlbumModalViewIdContext.Provider>
    )
}

export function useAlbumModalViewId() {
    return useContext(AlbumModalViewIdContext);
}

export function useSetAlbumModalViewId() {
    return useContext(SetAlbumModalViewIdContext);
}
