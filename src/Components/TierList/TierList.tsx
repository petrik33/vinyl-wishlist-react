import * as React from 'react';
import './TierList.css';
import TierListHeader from '../TierListHeader/TierListHeader';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView, { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import { TierGroupsActionKind } from '../../Context/TierGroupsContext';
import ButtonGroupLine from '../ButtonGroupLine/ButtonGroupLine';
import LineButton from '../LineButton/LineButton';
import { useTierGroupsDispatch } from '../../Context/TierGroupsContext';
import TopPin from '../TopPin/TopPin';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import {ReactComponent as ViewIcon} from '../../Icons/free-icon-font-eye-3917052.svg';
import {ReactComponent as EditIcon} from '../../Icons/free-icon-font-pencil-3917563.svg';
import {ReactComponent as AuthorsIcon} from '../../Icons/free-icon-font-user-3917688.svg';
import {ReactComponent as TiersIcon} from '../../Icons/free-icon-font-heart-3916585.svg';


export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
	const [editing, setEditing] = React.useState(false);
  const [viewGroupsKind, setViewGroupsKind] = 
    React.useState(AlbumGroupsKind.AUTHORS);
  const tierGroupsDispatch = useTierGroupsDispatch();

  return (
    <div className='tierlist'>
				<TopPin>
          <TierListHeader>TierList</TierListHeader>
          {!editing && 
            <RadioButtonGroup 
              state={viewGroupsKind}
              setState={setViewGroupsKind}
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
        </TopPin>
        <ButtonGroupLine>
          <LineButton 
            onClick={() => {setEditing(false)}} 
            icon={<ViewIcon />}
            active={!editing}
            >
              View
          </LineButton>
          <LineButton
            onClick={() => {setEditing(true)}}
            icon={<EditIcon />}
            active={editing}
          >
            Edit
          </LineButton>
        </ButtonGroupLine>
        <button onClick={() => {
          tierGroupsDispatch({
            type: TierGroupsActionKind.RESET_TO_DEBUG,
            parts: 4
          });
        }}>Debug Rank</button>
				{!editing && <AlbumsView groupsKind={viewGroupsKind} />}
				{editing && <AlbumsEdit />}
				<TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;