import * as React from 'react';

export interface IGroupViewProps {
}

enum GroupKind {
    TIER = 'Tier'
}

export default function GroupView (props: IGroupViewProps) {

}

const editedGroupName = 'Edited';

const editedFilter = (album: Album) => {
    return !album.tier;
}

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
