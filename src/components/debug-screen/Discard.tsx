import React from 'react';
import { CardGroup } from '../../game/CardGroup';
import CardInDeck from './CardInDeck';
import { Card } from '../../game/Card';

interface FuctionProps {
  discard: CardGroup;
}

const Discard = ({ discard }: FuctionProps) => (
  <div className='discard'>
    <h4>Discard</h4>
    <ul>
      {discard.getCards().map((card: Card) => (
        <CardInDeck card={card} />
      ))}
    </ul>
  </div>
);

export default Discard;
