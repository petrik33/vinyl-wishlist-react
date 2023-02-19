import * as React from 'react';

export interface IToolbarHorizontalProps {
  children?: React.ReactNode;
}

const ToolbarHorizontal : React.FC<IToolbarHorizontalProps> = (props) => {
  return (
    <div className='toolbar-horizontal'>
      {props.children}
    </div>
  );
}

export default ToolbarHorizontal;