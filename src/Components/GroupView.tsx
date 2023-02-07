import * as React from 'react';
import { Album, AlbumTier } from '../Context/AlbumsContext';
import ItemGroup from './ItemGroup';

export interface IGroupViewProps {
    onAlbumClick: React.MouseEventHandler;
}

enum GroupKind {
    TIER = 'Tier'
}

export default function GroupView (props: IGroupViewProps) {
    const [groupKind, setGroupKind] = React.useState(GroupKind.TIER);
    const [editingTiers, setEditingTiers] = React.useState(true);

    const groupProps = getGroupProps({
        kind: GroupKind.TIER,
        unranked: editingTiers
    });

    const itemGroups = groupProps.map((group, idx) => {
        return (
            <ItemGroup
                key={idx}
                {...group}
            />
        );
    });

    return (
        <div className='group-view-container'>
            {itemGroups}
        </div>
    )
}

const TIERS: AlbumTier[] = ['S', 'A', 'B', 'C', 'D'];
const TIER_NAMES: string[] = ['S', 'A', 'B', 'C', 'D'];

const editedGroupName = 'Edited';

type TierGroupParams = {
    kind: GroupKind.TIER;
    unranked: boolean;
}

type GroupParams = TierGroupParams;

export type AlbumFilter = (a: Album) => boolean;

type GroupProps = {
    groupFilter: AlbumFilter,
    name: string
};

function getGroupProps(params : GroupParams) : GroupProps[] {
    switch(params.kind) {
        case GroupKind.TIER: {
            let tierDescriptions = TIERS.map((tier, idx) => {
                const albumFilter = (album: Album) => {
                    return album.tier === tier;
                }

                const description: GroupProps = {
                    groupFilter: albumFilter,
                    name: TIER_NAMES[idx]
                };

                return description;
            });

            if(params.unranked) {
                const nullFilter = (album: Album) => {
                    return !album.tier;
                }

                const editedDescription: GroupProps = {
                    groupFilter: nullFilter,
                    name: editedGroupName
                }

                tierDescriptions.push(editedDescription);
            }

            return tierDescriptions;
        }

        default: {
            return [{
                groupFilter: (a: Album) => true,
                name: 'All'
            }];
        }
    }
}
