import React from 'react';
import { RCard } from '../../game/Card';
import './CardInDeck.css';

interface FunctionProps {
  card: RCard;
}
const CardInDeck = ({ card }: FunctionProps) => {
  return <li className='card-in-deck'>{card.name}</li>;
};

export default CardInDeck;
