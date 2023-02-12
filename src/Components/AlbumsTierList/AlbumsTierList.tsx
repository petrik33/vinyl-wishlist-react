import * as React from 'react';
import './AlbumsTierList.css';
import TierListHeader from '../TierListHeader/TierListHeader';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumInfo from '../AlbumInfo/AlbumInfo';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView from '../AlbumsView/AlbumsView';
import { TierGroupsProvider } from '../../Context/TierGroupsContext';
import ButtonGroupLine from '../ButtonGroupLine/ButtonGroupLine';
import LineButton from '../LineButton/LineButton';
import {ReactComponent as ViewIcon} from '../../Icons/free-icon-font-eye-3917052.svg';
import {ReactComponent as EditIcon} from '../../Icons/free-icon-font-followcollection-9291831.svg';

export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
	const [editing, setEditing] = React.useState(false);
	const [albumInfoId, setAlbumInfoId] = React.useState("");

  return (
    <div className='tierlist'>
			<TierGroupsProvider>
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
				{!editing && <AlbumsView></AlbumsView>}
				{editing && <AlbumsEdit></AlbumsEdit>}
				{albumInfoId.length > 0 && <AlbumInfo></AlbumInfo>}
				<TierListFooter>Made by?</TierListFooter>
			</TierGroupsProvider>
    </div>
  );
}

export default AlbumsTierList;