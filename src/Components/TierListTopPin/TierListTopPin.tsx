import * as React from 'react';
import TopPin from '../TopPin/TopPin';
import TierListHeader from '../TierListHeader/TierListHeader';
import Toolbar from '../Toolbar/Toolbar';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import PushButton from '../PushButton/PushButton';
import {ReactComponent as AuthorsIcon} from '../../Icons/free-icon-font-user-3917688.svg';
import {ReactComponent as TiersIcon} from '../../Icons/free-icon-font-heart-3916585.svg';
import {ReactComponent as UndoIcon} from '../../Icons/free-icon-font-rotate-left-7434925.svg';
import {ReactComponent as DoAgainIcon} from '../../Icons/free-icon-font-rotate-right-3917289.svg';
import { dispatchDoAgain, dispatchUndo } from '../AlbumsEdit/AlbumsEdit';
import { useTierGroupsDispatch } from '../../Context/TierGroupsContext';

export interface ITierListTopPinProps {
  editing: boolean;
  viewGroupsKind: AlbumGroupsKind;
  setViewGroupsKind: React.Dispatch<React.SetStateAction<AlbumGroupsKind>>;
}

const TierListTopPin : React.FC<ITierListTopPinProps> = (props) => {
  const tierGroupsDispatch = useTierGroupsDispatch();

  return (
    <TopPin>
      <TierListHeader>TierList</TierListHeader>
      <Toolbar>
        {!props.editing &&
          <RadioButtonGroup
            state={props.viewGroupsKind}
            setState={props.setViewGroupsKind}
            buttons={[
              {
                icon: (<TiersIcon />),
                value: AlbumGroupsKind.TIERS
              },
              {
                icon: (<AuthorsIcon />),
                value: AlbumGroupsKind.AUTHORS
              }
            ]}
        />}
        {props.editing &&
        <>
          <PushButton
            icon={<UndoIcon />}
            onClick={() => {dispatchUndo(tierGroupsDispatch)}}
          />
          <PushButton
            icon={<DoAgainIcon />}
            onClick={() => {dispatchDoAgain(tierGroupsDispatch)}}
          />
        </>
        }
      </Toolbar>
    </TopPin>
  );
}

export default TierListTopPin;