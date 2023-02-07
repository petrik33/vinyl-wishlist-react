import React, { useState } from 'react';
import './App.css';
import GroupView from './Components/GroupView';
import { AlbumsProvider } from './Context/AlbumsContext';

function App() {
  return (
    <AlbumsProvider>
      <GroupView />
    </AlbumsProvider>
  );
}

export default App;
