import * as React from 'react';
import './RadioButton.css'

export interface IRadioButtonProps {
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode
}

const RadioButton : React.FC<IRadioButtonProps> = (props) => {
  return (
    <div onClick={props.onClick} className={getButtonClass(props.active)}>
      {props.icon}
    </div>
  );
}

const getButtonClass = (active: boolean) => {
  let className = 'radio-button';
  if(active) {
    className += ' active';
  }
  return className;
}

export default RadioButton;