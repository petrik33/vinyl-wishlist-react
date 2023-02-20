import * as React from 'react';
import TopPin from '../TopPin/TopPin';
import TierListHeader from '../TierListHeader/TierListHeader';
import Toolbar from '../Toolbar/Toolbar';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import {ReactComponent as AuthorsIcon} from '../../Icons/free-icon-font-user-3917688.svg';
import {ReactComponent as TiersIcon} from '../../Icons/free-icon-font-heart-3916585.svg';

export interface ITierListTopPinProps {
  editing: boolean;
  viewGroupsKind: AlbumGroupsKind;
  setViewGroupsKind: React.Dispatch<React.SetStateAction<AlbumGroupsKind>>;
}

const TierListTopPin : React.FC<ITierListTopPinProps> = (props) => {
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
          <RadioButtonGroup
            state={props.viewGroupsKind}
            setState={props.setViewGroupsKind}
            buttons={[
              {
                icon: (<TiersIcon />),
                value: AlbumGroupsKind.TIERS
              }
            ]}
        />}
      </Toolbar>
    </TopPin>
  );
}

export default TierListTopPin;