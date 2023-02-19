import * as React from 'react';
import './TopPin.css'

export interface ITopPinProps {
  children?: React.ReactNode;
}

const TopPin : React.FC<ITopPinProps> = (props) => {
  return (
    <>
      <div className='toolbar-sized'></div>
      <div className='toolbar-sized toolbar pinned-top'>
        {props.children}
      </div>
    </>
  );
}

export default TopPin;