import React from 'react';
import './App.css';
import AlbumsTierList from '../TierList/TierList';
import { TierGroupsProvider } from '../../Context/TierGroupsContext';

function App() {
  return (
    <div>
      <TierGroupsProvider>
        <AlbumsTierList />
      </TierGroupsProvider>
    </div>
  );
}

export default App;
