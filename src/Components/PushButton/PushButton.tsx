import * as React from 'react';
import './PushButton.css'

export interface IPushButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const PushButton : React.FC<IPushButtonProps> = (props) => {
  return (
    <button
      className='push-button'
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}

export default PushButton;