import React from 'react';
import CardInDeck from './CardInDeck';

const Discard = () => (
  <div className='discard'>
    <h4>Discard</h4>
    <ul>
      <CardInDeck />
      <CardInDeck />
    </ul>
  </div>
);

export default Discard;
