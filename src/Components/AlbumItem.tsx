import * as React from 'react';
import WebImage, { IWebImageProps } from './Utilities/WebImage';
import { useState } from 'react';
import { AlbumTier } from '../Context/AlbumsContext';

export interface IAlbumItemProps {
    name: string,
    src: string,
    tier: AlbumTier
}

export default function AlbumItem (props: IAlbumItemProps) {
    const handleClick = (event: React.MouseEvent) => {
    }

    const [sad, setSad] = useState(0);

    const imageProps : IWebImageProps = {
        src: props.src,
        alt: `${props.name} album cover`,
        className: 'album',
        style: getTieredStyle(props.tier)
    }

    return (
        <div onClick={handleClick}>
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