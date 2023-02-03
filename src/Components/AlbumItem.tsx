import * as React from 'react';
import WebImage, { IWebImageProps } from './Utilities/WebImage';
import { useState } from 'react';

export type AlbumRank = 
    'S' | 'A' | 'B' | 'C' | 'D'; 

export interface IAlbumItemProps {
    name: string,
    src: string,
    rank?: AlbumRank
}

export default function AlbumItem (props: IAlbumItemProps) {
    const [isCloseViewed, setIsCloseViewed] = useState(false);

    const imageProps : IWebImageProps = {
        src: props.src,
        alt: `${props.name} album cover`,
        className: 'album'
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
    return {
        boxShadow: `4px 4px 0px 0px --rank-${rank}-color` 
    }
}