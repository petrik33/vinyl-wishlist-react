import * as React from 'react';
import GroupView, { IGroupViewProps } from './GroupView';
import AlbumModalView from './AlbumModalView';

export enum TierListViewKind {
    GROUP = 'group',
    EDIT = 'edit'
};

export interface ITierListProps {
}

export default function TierList (props: ITierListProps) {
    const [viewKind, setViewKind] = React.useState(initialTierListViewKind);
    const [albumModalId, setAlbumModalId] = React.useState(-1);

    const viewElement = getViewElement(view);

    return (
    <div className='tier-list'>
        {viewElement}
        {(albumModalId !== -1) && <AlbumModalView />}
    </div>
    );
}

const initialTierListViewKind = TierListViewKind.GROUP;

type TierListGroupView = {
    type: TierListViewKind.GROUP
    props: IGroupViewProps
}

type TierListEditView = {
    type: TierListViewKind.EDIT
    props: IGroupViewProps
}

type TierListView = TierListGroupView | TierListEditView;

function getViewElement(view: TierListView) : React.ReactNode {
    switch(view.type) {
        case TierListViewKind.GROUP : {
            return (
                <GroupView />
            );
        }

        case TierListViewKind.EDIT : {
            //Debug
            return (
                <GroupView />
            );
        }

        default: {
            return null;
        }
    }
}
