import * as React from 'react';
import { Album } from '../Context/AlbumsContext';
import ItemGroup from './ItemGroup';
import { AlbumTiers } from '../Context/AlbumsContext'; 
import AlbumModalView from './AlbumModalView';
import AlbumModalViewIdProvider, { useAlbumModalViewId } from '../Context/AlbumModalViewContext';

export interface IGroupViewProps {
}

enum GroupKind {
    TIER = 'Tier'
}

export default function GroupView (props: IGroupViewProps) {
    const [groupKind, setGroupKind] = React.useState(GroupKind.TIER);
    const [editingTiers, setEditingTiers] = React.useState(true);

    let groupProps;

    if(editingTiers) {
        groupProps = getGroupProps(GroupKind.TIER);

        const editedGroupProps: GroupProps = {
            groupFilter: editedFilter,
            name: editedGroupName
        }

        groupProps.push(editedGroupProps);
    } else {
        groupProps = getGroupProps(groupKind);
    }

    const itemGroups = groupProps.map((group, idx) => {
        return (
            <ItemGroup
                key={idx}
                {...group}
            />
        );
    });

    const modalAlbumId = useAlbumModalViewId();
    const showModal = modalAlbumId !== -1;

    return (
        <div className='group-view-container'>
            {itemGroups}
            {showModal && <AlbumModalView albumId={modalAlbumId} />}
        </div>
    )
}

const editedFilter = (album: Album) => {
    return !album.tier;
}

const editedGroupName = 'Edited';

export type AlbumFilter = (a: Album) => boolean;

type GroupProps = {
    groupFilter: AlbumFilter,
    name: string
};

function getGroupProps(kind : GroupKind) : GroupProps[] {
    switch(kind) {
        case GroupKind.TIER: {
            const groupProps = AlbumTiers.map((tier, idx) => {
                const albumFilter = (album: Album) => {
                    return album.tier === tier;
                }

                const description: GroupProps = {
                    groupFilter: albumFilter,
                    name: AlbumTiers[idx]
                };

                return description;
            });

            return groupProps;
        }

        default: {
            return [{
                groupFilter: (a: Album) => true,
                name: 'All'
            }];
        }
    }
}
