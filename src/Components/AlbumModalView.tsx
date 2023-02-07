import * as React from 'react';
import { useAlbumModalViewId } from '../Context/AlbumModalViewContext';
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

    return (
        <div className='modal-div'>
            <WebImage 
                src={album.src}
                alt={`${album.name} album cover`}
            />
        </div>
    );
}
