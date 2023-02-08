import * as React from 'react';
import { Album } from '../Context/AlbumsContext';

export interface IAlbumItemInfoProps {
    album: Album
}

export default function AlbumItemInfo (props: IAlbumItemInfoProps) {
    const album = props.album;

    return (
        <div className='album-item-info'>
            <div className='album-item-info-tier'>
                <b>{album.tier}</b>
            </div>
            <div className='album-item-info-fields'>
                <div className='album-item-info-name'>
                    {album.name}
                </div>
            </div>
        </div>
    );
}
