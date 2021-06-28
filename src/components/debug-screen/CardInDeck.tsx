import React from 'react';
import { Card } from '../../game/Card';
import './CardInDeck.css';

interface FunctionProps {
  card: Card;
}
const CardInDeck = ({ card }: FunctionProps) => {
  return <li className='card-in-deck'>{card.name}</li>;
};

export default CardInDeck;
