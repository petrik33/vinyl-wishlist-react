import React from 'react';
import './App.css';
import TierList from '../Components/TierList/TierList';
import { AlbumsProvider } from '../Context/AlbumsContext';

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
      <AlbumsProvider>
        <TierList />
      </AlbumsProvider>
    </div>
  );
}

export default App;
