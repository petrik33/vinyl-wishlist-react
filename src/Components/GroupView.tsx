import * as React from 'react';
import { Album } from '../Context/AlbumsContext';
import ItemGroup from './ItemGroup';
import { AlbumTiers } from '../Context/AlbumsContext'; 
import AlbumModalView from './AlbumModalView';
import { useAlbumModalViewId } from '../Context/AlbumModalViewContext';
import { useEditMode } from '../Context/EditingModeContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export interface IGroupViewProps {
}

enum GroupKind {
    TIER = 'Tier'
}

export default function GroupView (props: IGroupViewProps) {
    const [groupKind, setGroupKind] = React.useState(GroupKind.TIER);
    const editMode = useEditMode();

    let groupProps;

    if(editMode) {
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
            <Droppable key={group.name} droppableId={group.name}>
                {(provided) => (
                    <div 
                    key={idx}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        <ItemGroup
                            key={idx}
                            {...group}
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    });

    const modalAlbumId = useAlbumModalViewId();
    const showModal = modalAlbumId !== -1;

    return (
        <div className='group-view-container'>
            <DragDropContext onDragEnd={() => {}}>
                {itemGroups}
            </DragDropContext>
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
