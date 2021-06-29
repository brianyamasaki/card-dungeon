import React from 'react';
import { Card } from '../../game/Card';
import CardActions from './CardActions';
import { gameInterface } from '../../game/GameInterface';

import './CardInHand.css';

interface FunctionProps {
  card: Card;
}
const cardInHand = ({ card }: FunctionProps) => {
  if (!gameInterface) return null;
  const monsters = gameInterface.getGameState().getMonsters();
  return (
    <li className='card-in-hand'>
      <p>
        {card.name} (cost {card.cost})
      </p>
      <CardActions card={card} monsters={monsters} />
    </li>
  );
};

export default cardInHand;
