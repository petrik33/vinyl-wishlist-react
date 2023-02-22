import React, { useContext } from 'react';
import './App.css';
import TierList from '../TierList/TierList';
import { TierGroupsProvider } from '../../Context/TierGroupsContext';
import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPN5OyIr39yg95jCUtkfIr8qURd_eEUyM",
  authDomain: "vinyl-wishlist-react.firebaseapp.com",
  projectId: "vinyl-wishlist-react",
  storageBucket: "vinyl-wishlist-react.appspot.com",
  messagingSenderId: "678259530546",
  appId: "1:678259530546:web:eafa0caea3d3e011a4d52b",
  measurementId: "G-BT8W55LY3G"
};

// Initialize Firebase
const AppContext = React.createContext({} as FirebaseApp);
const app = initializeApp(firebaseConfig);

function App() {
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
    <div>
      <AppContext.Provider value={app}>
        <TierGroupsProvider>
          <TierList />
        </TierGroupsProvider>
      </AppContext.Provider>
    </div>
  );
}

export const useFirebaseApp = () => {
  useContext(AppContext);
}

export default App;
