import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentData, Query, collection, collectionGroup, getFirestore } from 'firebase/firestore';
import { IAlbumData, IAuthorData } from '../Data/Data';

const firebaseConfig = {
  apiKey: "AIzaSyCPN5OyIr39yg95jCUtkfIr8qURd_eEUyM",
  authDomain: "vinyl-wishlist-react.firebaseapp.com",
  projectId: "vinyl-wishlist-react",
  storageBucket: "vinyl-wishlist-react.appspot.com",
  messagingSenderId: "678259530546",
  appId: "1:678259530546:web:eafa0caea3d3e011a4d52b",
  measurementId: "G-BT8W55LY3G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

const createCollectionGroup = <T = DocumentData>(groupName: string) => {
  return collectionGroup(db, groupName) as Query<T>;
}

export const authorsCollecion
  = createCollection<IAuthorData>('authors');

export const albumsCollection 
  = createCollectionGroup<IAlbumData>('albums');

export default db;