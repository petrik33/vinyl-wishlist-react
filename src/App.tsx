import React, { useState } from 'react';
import './App.css';
import { AlbumsProvider } from './Context/AlbumsContext';
import TierList from './Components/TierList';

function App() {
  return (
    <AlbumsProvider>
      <TierList />
    </AlbumsProvider>
  );
}

export default App;
