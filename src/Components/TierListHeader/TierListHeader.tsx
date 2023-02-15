import * as React from 'react';
import './TierListHeader.css'

export interface ITierListHeaderProps {
  children?: React.ReactNode;
}

const TierListHeader : React.FC<ITierListHeaderProps> = (props) => {
  return (
    <h1 className='tierlist-header'>
      TIER<span className='tierlist-header-S'>S</span>
    </h1>
  );
}

export default TierListHeader;