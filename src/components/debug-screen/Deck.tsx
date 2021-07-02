import React from 'react';
import { useRecoilValue } from 'recoil';
import { RCard } from '../../game/Card';
import CardInDeck from './CardInDeck';
import { deckState } from './recoilState';

const Deck = () => {
  const cards = useRecoilValue(deckState);
  return (
    <div className='deck'>
      <h4>Deck</h4>
      <ul>
        {cards.map((card: RCard, i: number) => (
          <CardInDeck card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Deck;
