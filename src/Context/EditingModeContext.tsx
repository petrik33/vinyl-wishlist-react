import * as React from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import { IProviderProps } from './AlbumsContext';

const initial = false;
const initialSetter = {} as React.Dispatch<React.SetStateAction<boolean>>;

const EditModeContext = createContext(initial);
const SetEditModeContext = createContext(initialSetter);

export default function EditModeProvider(props: IProviderProps) {
    const [editMode, setEditMode] = useState(initial);

    return (
        <EditModeContext.Provider value={editMode}>
            <SetEditModeContext.Provider value={setEditMode}>
                {props.children}
            </SetEditModeContext.Provider>
        </EditModeContext.Provider>
    )
}

export function useEditMode() {
    return useContext(EditModeContext);
}

export function useSetEditMode() {
    return useContext(SetEditModeContext);
}
