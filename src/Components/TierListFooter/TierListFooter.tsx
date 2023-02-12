import * as React from 'react';
import './TierListFooter.css'

export interface ITierListFooterProps {
  children?: React.ReactNode;
}

const TierListFooter : React.FC<ITierListFooterProps> = (props) => {
  return (
    <footer className='tierlist-footer'>
        {props.children}
    </footer>
  );
}

export default TierListFooter;