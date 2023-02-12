import * as React from 'react';
import './AlbumsTierList.css';
import TierListHeader from '../TierListHeader/TierListHeader';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumInfo from '../AlbumInfo/AlbumInfo';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView from '../AlbumsView/AlbumsView';
import { TierGroupsAction, TierGroupsActionKind, TierGroupsProvider } from '../../Context/TierGroupsContext';
import ButtonGroupLine from '../ButtonGroupLine/ButtonGroupLine';
import LineButton from '../LineButton/LineButton';
import {ReactComponent as ViewIcon} from '../../Icons/free-icon-font-eye-3917052.svg';
import {ReactComponent as EditIcon} from '../../Icons/free-icon-font-followcollection-9291831.svg';
import { useTierGroupsDispatch } from '../../Context/TierGroupsContext';

export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
	const [editing, setEditing] = React.useState(false);
	const [albumInfoId, setAlbumInfoId] = React.useState("");
  const tierGroupsDispatch = useTierGroupsDispatch();

  return (
    <div className='tierlist'>
				<TierListHeader>TierList</TierListHeader>
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
        }}>Reset</button>
				{!editing && <AlbumsView></AlbumsView>}
				{editing && <AlbumsEdit></AlbumsEdit>}
				{albumInfoId.length > 0 && <AlbumInfo></AlbumInfo>}
				<TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;