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
    const [isCloseViewed, setIsCloseViewed] = useState(false);

    const imageProps : IWebImageProps = {
        src: props.src,
        alt: `${props.name} album cover`,
        className: 'album',
        style: getTieredStyle(props.tier)
    }

    if(isCloseViewed) {
        imageProps.className += ' close';
    }

    const basicView = (
        <WebImage
            {...imageProps}
        />
    );

    const closeView = (
        <div className='modal-div'>
            {basicView}
        </div>
    );

    if(isCloseViewed) {
        return closeView;
    }

    return basicView;
}

const getTieredStyle = (tier: AlbumTier) : React.CSSProperties => {
    let colorStr;
    if(tier) {
        colorStr = `--tier-${tier}-color`;
    } else {
        colorStr = 'black';
    }

    return {
        boxShadow: `4px 4px 0px 0px ${colorStr}` 
    }
}