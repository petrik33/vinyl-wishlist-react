import React from 'react';
import './App.css';
import TierList from '../Components/TierList/TierList';
import { AlbumsProvider } from '../Context/AlbumsContext';
import LoggedInProvider from '../Context/LoginContext';

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
      <LoggedInProvider>
        <AlbumsProvider>
          <TierList />
        </AlbumsProvider>
      </LoggedInProvider>
    </div>
  );
}

export default App;
