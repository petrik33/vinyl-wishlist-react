import * as React from 'react';
import './ToolbarHorizontal.css'

export interface IToolbarHorizontalProps {
  children?: React.ReactNode;
}

const ToolbarHorizontal : React.FC<IToolbarHorizontalProps> = (props) => {
  return (
    <>
      <div className='toolbar-sized'></div>
      <div className='toolbar-sized toolbar pinned-top'>
        {props.children}
      </div>
    </>
  );
}

export default ToolbarHorizontal;