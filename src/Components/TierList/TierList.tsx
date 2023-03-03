import * as React from 'react';
import './TierList.css';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView, { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import TierListTopPin from '../TierListTopPin/TierListTopPin';
import { useTierGroups, useTierGroupsDispatch } from '../../Context/TierGroupsContext';
import db, { albumsCollection } from '../../Firebase/firebase';
import { collection, collectionGroup, getDocs, query } from 'firebase/firestore';


export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
  const tierGroups = useTierGroups();
  const tierGroupsDispatch = useTierGroupsDispatch();
	const [editing, setEditing] = React.useState(false);
  const [viewGroupsKind, setViewGroupsKind] = 
    React.useState(AlbumGroupsKind.TIERS);
  
  React.useEffect(() => {
    const fetchAlbums = async () => {
      const albums = await getDocs(query(albumsCollection));
      albums.forEach((doc) => {
        
      })
    }
  }, [])

  return (
    <div className='tierlist'>
      <TierListTopPin 
        editing={editing}
        setEditing={setEditing}
        viewGroupsKind={viewGroupsKind}
        setViewGroupsKind={setViewGroupsKind}
        tierGroupsDispatch={tierGroupsDispatch}
      />

      {!editing && 
        <AlbumsView 
          tierGroups={tierGroups} 
          groupsKind={viewGroupsKind} 
        />}

      {editing && 
        <AlbumsEdit 
          tierGroups={tierGroups} 
          tierGroupsDispatch={tierGroupsDispatch}
        />}

      <TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

export default AlbumsTierList;