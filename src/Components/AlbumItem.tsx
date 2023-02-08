import * as React from 'react';
import WebImage from './Utilities/WebImage';
import { useState } from 'react';
import { AlbumTier } from '../Context/AlbumsContext';
import { useSetAlbumModalViewId } from '../Context/AlbumModalViewContext';
import { Album } from '../Context/AlbumsContext';
import AlbumItemInfo from './AlbumItemInfo';

export interface IAlbumItemProps {
    album: Album;
}

export default function AlbumItem (props: IAlbumItemProps) {
    const [showInfo, setShowInfo] = useState(false);
    const setModal = useSetAlbumModalViewId();
    const album = props.album;

    const handleClick = (event: React.MouseEvent) => {
        //Debug
        setModal(album.id);
    }

    return (
        <div className='album-item'
            onClick={handleClick}
            onMouseEnter={() => {setShowInfo(true)}}
            onMouseLeave={() => {setShowInfo(false)}}
        >
            <WebImage
                src={album.src}
                alt={`${album.name} album cover`}
                className={getAlbumItemClassName(showInfo)}
                sizes={'200px'}
                style={getTieredStyle(album.tier)}
            />
            {showInfo && <AlbumItemInfo album={album}/>}
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