import * as React from 'react';
import './ButtonGroupLine.css'

export interface IButtonGroupLineProps {
  children?: React.ReactNode;
}

const ButtonGroupLine : React.FC<IButtonGroupLineProps> = (props) => {
  return (
    <div className='button-group-line'>
      {props.children}
    </div>
  );
}

export default ButtonGroupLine;