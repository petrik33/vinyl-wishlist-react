import * as React from 'react';
import './TierList.css';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView, { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import TierListTopPin from '../TierListTopPin/TierListTopPin';


export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
	const [editing, setEditing] = React.useState(false);
  const [viewGroupsKind, setViewGroupsKind] = 
    React.useState(AlbumGroupsKind.TIERS);

  const handleScroll = React.useCallback(() => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
  }, [])

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='tierlist'>
				<TierListTopPin 
          editing={editing}
          setEditing={setEditing}
          viewGroupsKind={viewGroupsKind}
          setViewGroupsKind={setViewGroupsKind}
        />
				{!editing && <AlbumsView groupsKind={viewGroupsKind} />}
				{editing && <AlbumsEdit />}
				<TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;