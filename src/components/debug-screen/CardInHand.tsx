import React from 'react';
import { useRecoilValue } from 'recoil';
import { monstersState } from './recoilState';
import { RCard } from '../../game/Card';
import { RMonster } from '../../game/Monster';
import CardActions from './CardActions';

import './CardInHand.css';

interface FunctionProps {
  card: RCard;
}
const CardInHand = ({ card }: FunctionProps) => {
  const monsters: RMonster[] = useRecoilValue(monstersState);
  return (
    <li className='card-in-hand'>
      <p>
        {card.name} (cost {card.cost})
      </p>
      <CardActions card={card} monsters={monsters} />
    </li>
  );
};

export default CardInHand;
