import * as React from 'react';
import './TierList.css';
import TierListFooter from '../TierListFooter/TierListFooter';
import AlbumsEdit from '../AlbumsEdit/AlbumsEdit';
import AlbumsView, { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import TierListTopPin from '../TierListTopPin/TierListTopPin';
import { albumsCollection } from '../../Firebase/firebase';
import { QuerySnapshot, getDocs, query } from 'firebase/firestore';
import { IAlbum, IAlbumData, IAlbumsCollectionData } from '../../Data/Data';
import { AlbumsDispatch, AlbumsDispatchLoad, useAlbumsDispatch, useAlbumsState } from '../../Context/AlbumsContext';

export interface IAlbumsTierListProps {
  
}

const AlbumsTierList : React.FC<IAlbumsTierListProps> = (props) => {
  const albumsState = useAlbumsState();
  const albumsCurrentSnap =
    albumsState.history[albumsState.current];
  const albumsDispatch = useAlbumsDispatch();
	const [editing, setEditing] = React.useState(false);
  const [viewGroupsKind, setViewGroupsKind] = 
    React.useState(AlbumGroupsKind.TIERS);

  const fetchCallback = React.useCallback(() => {
    fetchAlbums(albumsDispatch);
  }, [albumsDispatch]);
  
  React.useEffect(() => {
    fetchCallback();
  }, [fetchCallback])

  return (
    <div className='tierlist'>
      <TierListTopPin 
        editing={editing}
        setEditing={setEditing}
        viewGroupsKind={viewGroupsKind}
        setViewGroupsKind={setViewGroupsKind}
        albumsDispatch={albumsDispatch}
      />

      {!editing && 
        <AlbumsView 
          albumsSnap={albumsCurrentSnap} 
          groupsKind={viewGroupsKind} 
        />}

      {editing && 
        <AlbumsEdit 
          albumsSnap={albumsCurrentSnap} 
          albumsDispatch={albumsDispatch}
        />}

      <TierListFooter>Made by?</TierListFooter>
    </div>
  );
}

const fetchAlbums = async (dispatch: AlbumsDispatch) => {
  const albumDocs = 
    await getDocs(query(albumsCollection));

  const albumsCollectionData = mapAlbumDocs(albumDocs);

  AlbumsDispatchLoad(
    dispatch, albumsCollectionData);
}

const mapAlbumDocs = 
  (docs: QuerySnapshot<IAlbumData>) => {
    const albumsCollectionData: IAlbumsCollectionData = {};
    docs.forEach((doc) => {
      const data = doc.data();
      const album: IAlbum = {
        id: doc.id,
        ...data
      }
      albumsCollectionData[album.id] = album;
    })
    return albumsCollectionData;
}

export default AlbumsTierList;