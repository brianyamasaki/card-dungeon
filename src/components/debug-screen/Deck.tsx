import React from 'react';
import { Card } from '../../game/Card';
import { CardGroup } from '../../game/CardGroup';
import CardInDeck from './CardInDeck';

interface FunctionProps {
  deck: CardGroup;
}

const Deck = ({ deck }: FunctionProps) => {
  return (
    <div className='deck'>
      <h4>Deck</h4>
      <ul>
        {deck.getCards().map((card: Card, i: number) => (
          <CardInDeck card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Deck;
