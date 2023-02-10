import * as React from 'react';
import WebImage from './Utilities/WebImage';
import { useState } from 'react';
import { AlbumTier } from '../Context/AlbumsContext';
import { useSetAlbumModalViewId } from '../Context/AlbumModalViewContext';
import { Album } from '../Context/AlbumsContext';
import AlbumItemInfo from './AlbumItemInfo';
import { useEditMode } from '../Context/EditingModeContext';

export interface IAlbumItemProps {
    album: Album;
}

export default function AlbumItem (props: IAlbumItemProps) {
    const [hovered, setHovered] = useState(false);
    const setModal = useSetAlbumModalViewId();
    const editMode = useEditMode();

    const album = props.album;

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if(editMode) {
            
            return;
        }

        setModal(album.id);
    }

    const onMouseEnter = (event: React.MouseEvent) => {
        setHovered(true);
    }

    const onMouseLeave = (event: React.MouseEvent) => {
        setHovered(false);
    }

    return (
        <div className='album-item'
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <WebImage
                src={album.src}
                alt={`${album.name} album cover`}
                className={getAlbumItemClassName(hovered)}
                sizes={'200px'}
                style={getTieredStyle(album.tier)}
            />
            {hovered && !editMode && <AlbumItemInfo album={album}/>}
        </div>
    )
}

function getAlbumItemClassName(hovered: boolean) {
    let className = 'album-item-image';

    if(hovered) {
        className += ' album-item-image-hover';
    }

    return className;
}

const getTieredStyle = (tier: AlbumTier) : React.CSSProperties => {
    let colorStr;
    if(tier) {
        let varStr = `--tier-${tier}-color`;
        let rootStyle = getComputedStyle(document.documentElement);
        colorStr = rootStyle.getPropertyValue(varStr);
    } else {
        colorStr = 'gray';
    }

    return {
        boxShadow: `5px 5px 0px 0px ${colorStr}` 
    }
}