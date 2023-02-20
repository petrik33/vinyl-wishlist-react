import * as React from 'react';
import './Toolbar.css'

export interface IToolbarProps {
  children?: React.ReactNode;
}

const Toolbar : React.FC<IToolbarProps> = (props) => {
  return (
    <div className='toolbar'>
      {props.children}
    </div>
  );
}

export default Toolbar;