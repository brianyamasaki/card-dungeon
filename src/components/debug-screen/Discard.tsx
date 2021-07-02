import React from 'react';
import { useRecoilValue } from 'recoil';
import CardInDeck from './CardInDeck';
import { RCard } from '../../game/Card';
import { discardState } from './recoilState';

const Discard = () => {
  const cards = useRecoilValue(discardState);
  return (
    <div className='discard'>
      <h4>Discard</h4>
      <ul>
        {cards.map((card: RCard, i: number) => (
          <CardInDeck card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Discard;
