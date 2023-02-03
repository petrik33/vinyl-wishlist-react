import * as React from 'react';

export interface IWebImageProps {
    sources?: Array<JSX.Element>;
    srcSet?: string;
    src: string;
    sizes?: string;
    alt: string;
}

export default function WebImage (props: IWebImageProps) {
  return (
    <picture>
        {props?.sources}
        <img
            src={props.src}
            srcSet={props.srcSet}
            sizes={props.sizes}
            alt={props.alt}
        />
    </picture>
  );
}
