import * as React from 'react';
import './TierList.css';
import TierListHeader from '../TierListHeader/TierListHeader';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView from '../AlbumsView/AlbumsView';
import { TierGroupsActionKind } from '../../Context/TierGroupsContext';
import ButtonGroupLine from '../ButtonGroupLine/ButtonGroupLine';
import LineButton from '../LineButton/LineButton';
import {ReactComponent as ViewIcon} from '../../Icons/free-icon-font-eye-3917052.svg';
import {ReactComponent as EditIcon} from '../../Icons/free-icon-font-followcollection-9291831.svg';
import { useTierGroupsDispatch } from '../../Context/TierGroupsContext';
import ToolbarHorizontal from '../ToolbarHorizontal/ToolbarHorizontal';

export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
	const [editing, setEditing] = React.useState(false);
  const tierGroupsDispatch = useTierGroupsDispatch();

  return (
    <div className='tierlist'>
				<ToolbarHorizontal>
          <TierListHeader>TierList</TierListHeader>
        </ToolbarHorizontal>
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
				{!editing && <AlbumsView></AlbumsView>}
				{editing && <AlbumsEdit></AlbumsEdit>}
				<TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;