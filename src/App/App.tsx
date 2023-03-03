import React, { useContext } from 'react';
import './App.css';
import TierList from '../Components/TierList/TierList';
import { TierGroupsProvider } from '../Context/TierGroupsContext';

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
      <TierGroupsProvider>
        <TierList />
      </TierGroupsProvider>
    </div>
  );
}

export default App;
