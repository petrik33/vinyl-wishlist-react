import * as React from 'react';
import './TopPin.css'

export interface ITopPinProps {
  children?: React.ReactNode;
}

const TopPin : React.FC<ITopPinProps> = (props) => {
  return (
    <div className='top-pin'>
      {props.children}
    </div>
  );
}

export default TopPin;