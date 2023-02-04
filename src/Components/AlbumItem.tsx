import * as React from 'react';
import WebImage, { IWebImageProps } from './Utilities/WebImage';
import { useState } from 'react';
import { AlbumRank } from '../Context/AlbumsContext';

export interface IAlbumItemProps {
    name: string,
    src: string,
    rank: AlbumRank
}

export default function AlbumItem (props: IAlbumItemProps) {
    const [isCloseViewed, setIsCloseViewed] = useState(false);

    const imageProps : IWebImageProps = {
        src: props.src,
        alt: `${props.name} album cover`,
        className: 'album',
        style: getRankedStyle(props.rank)
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

const getRankedStyle = (rank: AlbumRank) : React.CSSProperties => {
    let colorStr;
    if(rank) {
        colorStr = `--rank-${rank}-color`;
    } else {
        colorStr = 'black';
    }

    return {
        boxShadow: `4px 4px 0px 0px ${colorStr}` 
    }
}