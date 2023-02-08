import * as React from 'react';
import iconView from '../Icons/free-icon-font-eye-3917052.svg';
import iconEdit from '../Icons/free-icon-font-followcollection-9291831.svg';
import { useEditMode, useSetEditMode } from '../Context/EditingModeContext';
import TierListModeButton from './TierListModeButton';

export interface ITierListModeButtonsGroupProps {
}

export default function TierListModeButtonsGroup (props: ITierListModeButtonsGroupProps) {
    const editMode = useEditMode();
    const setEditMode = useSetEditMode();

    return (
        <div className='tier-list-mode-buttons-container'>
            <TierListModeButton
                iconSrc={iconView}
                selected={!editMode}
                name='View'
                onClick={() => {setEditMode(false)}}
            />
            <TierListModeButton
                iconSrc={iconEdit}
                selected={editMode}
                name='Edit'
                onClick={() => {setEditMode(true)}}
            />
        </div>
    );
}
