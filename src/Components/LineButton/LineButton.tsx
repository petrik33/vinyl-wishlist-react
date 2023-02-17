import * as React from 'react';
import './LineButton.css'

export interface ILineButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  active: boolean;
}

const LineButton : React.FC<ILineButtonProps> = (props) => {
  return (
    <div onClick={props.onClick} className={getButtonClass(props.active)}>
      <span className={getIconClass(props.active)}>{props.icon}</span>
      {props.children}
    </div>
  );
}

const getButtonClass = (active: boolean) => {
  let className = 'linebutton';
  if(active) {
    className += ' linebutton-active';
  }
  return className;
}

const getIconClass = (active: boolean) => {
  let className = 'linebutton-icon';
  if(active) {
    className += ' linebutton-icon-active';
  }
  return className;
}

export default LineButton;