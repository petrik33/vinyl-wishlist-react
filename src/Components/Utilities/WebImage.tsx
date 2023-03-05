import * as React from 'react';

export interface IWebImageProps {
  src: string;
  alt?: string;
  sources?: Array<JSX.Element>;
  srcSet?: string;
  sizes?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
}

const WebImage : React.FC<IWebImageProps> = (props) => {
  return (
    <picture>
        {props?.sources}
        <img
            src={props.src}
            srcSet={props.srcSet}
            sizes={props.sizes}
            width={props.width}
            height={props.height}
            alt={props.alt}
            className={props.className}
            style={props.style}
            draggable={props.draggable}
        />
    </picture>
  );
}

export default WebImage;
