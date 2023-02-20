import * as React from 'react';
import ButtonGroupLine from '../ButtonGroupLine/ButtonGroupLine';
import LineButton from '../LineButton/LineButton';
import {ReactComponent as ViewIcon} from '../../Icons/free-icon-font-eye-3917052.svg';
import {ReactComponent as EditIcon} from '../../Icons/free-icon-font-pencil-3917563.svg';

export interface ITierListViewEditButtonLineProps {
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const TierListViewEditButtonLine : React.FC<ITierListViewEditButtonLineProps> = (props) => {
  return (
    <div >
      <ButtonGroupLine>
        <LineButton 
          onClick={() => {props.setEditing(false)}} 
          icon={<ViewIcon />}
          active={!props.editing}
          >
            View
        </LineButton>
        <LineButton
          onClick={() => {props.setEditing(true)}}
          icon={<EditIcon />}
          active={props.editing}
        >
          Edit
        </LineButton>
      </ButtonGroupLine>
    </div>
  );
}

export default TierListViewEditButtonLine;