import * as React from 'react';
import WebImage, { IWebImageProps } from './Utilities/WebImage';
import { useState } from 'react';
import { AlbumTier } from '../Context/AlbumsContext';
import { useSetAlbumModalViewId } from '../Context/AlbumModalViewContext';

export interface IAlbumItemProps {
    name: string;
    src: string;
    tier: AlbumTier;
    id: number
}

export default function AlbumItem (props: IAlbumItemProps) {
    const setModal = useSetAlbumModalViewId();
    const handleClick = (event: React.MouseEvent) => {
        //Debug
        setModal(props.id);
    }

    const imageProps : IWebImageProps = {
        src: props.src,
        alt: `${props.name} album cover`,
        className: 'album',
        sizes: '200px',
        style: getTieredStyle(props.tier)
    }

    return (
        <div className='album-item' onClick={handleClick}>
            <WebImage
                {...imageProps}
            />
        </div>
    )
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