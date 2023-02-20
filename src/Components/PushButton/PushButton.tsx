import * as React from 'react';
import './PushButton.css'

export interface IPushButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const PushButton : React.FC<IPushButtonProps> = (props) => {
  return (
    <div onClick={props.onClick} >
      {props.icon}
    </div>
  );
}

export default PushButton;