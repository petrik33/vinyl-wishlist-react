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

  const albumsCollectionData = 
    await mapAlbumDocs(albumDocs);

  AlbumsDispatchLoad(
    dispatch, albumsCollectionData);
}

const mapAlbumDocs = async (
  docs: QuerySnapshot<IAlbumData>
) => {
    const albumsCollectionData: IAlbumsCollectionData = {};
    docs.forEach(async (doc) => {
      const data = doc.data();
      const album: IAlbum = {
        ...data,
        id: doc.id,
      }
      albumsCollectionData[album.id] = album;
    })
    return albumsCollectionData;
}

// const albumDocGetAuthor = async (
//   doc: QueryDocumentSnapshot<IAlbumData>
// ) => {
//   const parent = getDocParentRef(doc);
//   if(parent) {
//     const parentDoc = await getDoc(parent);
//     const author = parentDoc.data();
//     if(author && typeof author.name === 'string') {
//       return author.name;
//     }
//   }
//   return undefined;
// }

// const getDocParentRef = <T,>(
//   doc : QueryDocumentSnapshot<T>
// ) => {
//   const docRef = doc.ref;
//   const parentContainerRef = docRef.parent;
//   const parentDocRef = parentContainerRef.parent;
//   return parentDocRef;
// }

export default AlbumsTierList;