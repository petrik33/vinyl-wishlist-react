import * as React from 'react';
import WebImage from './Utilities/WebImage';
import { useAlbums } from '../Context/AlbumsContext';

export interface IAlbumModalViewProps {
    albumId: number;
}

export default function AlbumModalView (props: IAlbumModalViewProps) {
    const albumsAll = useAlbums();
    if(!albumsAll) {
        return null;
    }

    const album = albumsAll.find((album) => album.id === props.albumId);
    if(!album) {
        return null;
    }

    const handleModalExit = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedPicture = target.closest('.album-close');
    }

    return (
        <div className='modal-div' onClick={handleModalExit}>
            <WebImage 
                src={album.src}
                alt={`${album.name} album cover`}
                className='screen-centered album-close'
                sizes='600px'
            />
        </div>
    );
}
