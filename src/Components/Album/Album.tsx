import { AlbumTier } from "../../Context/AlbumsContext";

import * as React from 'react';
import { IAlbum } from "../../Data";
import WebImage from "../Utilities/WebImage";

export interface IAlbumProps {
    album: IAlbum;
}

export default function Album (props: IAlbumProps) {
    const album = props.album;
    return (
        <div className='album-item'>
            <WebImage
            src={album.src}
            alt={getImageAltText(album.name)}
            />
        </div>
    );
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

function getImageAltText(albumName: string) {
    return `${albumName} album cover`;
}