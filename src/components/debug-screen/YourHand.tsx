import React from 'react';
import { useRecoilValue } from 'recoil';
import CardInHand from './CardInHand';
import { handState } from './recoilState';
import { RCard } from '../../game/Card';
import './YourHand.css';

const YourHand = () => {
  const cards: RCard[] = useRecoilValue(handState);
  return (
    <ul className='your-hand'>
      {cards.map((card, i) => (
        <CardInHand card={card} key={i} />
      ))}
    </ul>
  );
};

export default YourHand;
