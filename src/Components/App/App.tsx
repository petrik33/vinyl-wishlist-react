import React, { useEffect } from 'react';
import './App.css';
import TierList from '../TierList/TierList';
import { TierGroupsProvider } from '../../Context/TierGroupsContext';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <TierGroupsProvider>
        <TierList />
      </TierGroupsProvider>
    </div>
  );
}

export default App;
