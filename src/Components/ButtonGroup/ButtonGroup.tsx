import * as React from 'react';
import './ButtonGroup.css'

export interface IButtonGroupProps {
  children?: React.ReactNode;
}

const ButtonGroup : React.FC<IButtonGroupProps> = (props) => {
  return (
    <div className='button-group'>
      {props.children}
    </div>
  );
}

export default ButtonGroup;