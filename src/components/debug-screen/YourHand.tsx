import React from 'react';
import CardInHand from './CardInHand';
import { CardGroup } from '../../game/CardGroup';
import './YourHand.css';

interface YourHandProps {
  cardgroup: CardGroup;
}

const YourHand = ({ cardgroup }: YourHandProps) => {
  return (
    <ul className='your-hand'>
      {cardgroup.getCards().map((card) => (
        <CardInHand card={card} />
      ))}
    </ul>
  );
};

export default YourHand;
