import React from 'react';
import './App.css';
import TierList from '../TierList/TierList';
import { TierGroupsProvider } from '../../Context/TierGroupsContext';

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
