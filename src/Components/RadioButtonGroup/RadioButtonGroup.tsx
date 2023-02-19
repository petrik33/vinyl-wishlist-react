import * as React from 'react';
import RadioButton from '../RadioButton/RadioButton';
import './RadioButtonGroup.css'

export type RadioButtonData<T> = {
  icon: React.ReactNode;
  value: T;
}

export interface IRadioButtonGroupProps<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  buttons: RadioButtonData<T>[];
}

type RadioButtonGroupT <T = any> = React.FC<IRadioButtonGroupProps<T>>;

const RadioButtonGroup : RadioButtonGroupT = (props) => {
  const buttons = mapButtons(props.buttons, props.state, props.setState);
  return (
    <div className='radio-button-group'>
      {buttons}
    </div>
  );
}

const mapButtons = <T, >(
  buttons: RadioButtonData<T>[],
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>> ) => {
    return buttons.map((button, idx) => (
      <RadioButton
        onClick={() => {setState(button.value)}}
        icon={button.icon}
        active={state === button.value}
        key={idx}
      />
    ));
}

export default RadioButtonGroup;