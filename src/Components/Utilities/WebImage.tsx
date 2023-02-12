import * as React from 'react';

export interface IWebImageProps {
  src: string;
  alt: string;
  sources?: Array<JSX.Element>;
  srcSet?: string;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
}

const WebImage : React.FC<IWebImageProps> = (props) => {
  return (
    <picture>
        {props?.sources}
        <img
            src={props.src}
            srcSet={props.srcSet}
            sizes={props.sizes}
            alt={props.alt}
            className={props.className}
            style={props.style}
        />
    </picture>
  );
}

export default WebImage;
