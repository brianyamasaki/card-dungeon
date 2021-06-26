import React from 'react';
import CardInDeck from './CardInDeck';

const Deck = () => (
  <div className='deck'>
    <h4>Deck</h4>
    <ul>
      <CardInDeck />
      <CardInDeck />
    </ul>
  </div>
);

export default Deck;
