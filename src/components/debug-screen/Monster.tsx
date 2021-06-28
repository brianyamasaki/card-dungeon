import React from 'react';
import { Monster } from '../../game/Monster';
import './Monster.css';

interface FunctionProps {
  monster: Monster;
}

const MonsterDisplay = ({ monster }: FunctionProps) => {
  return (
    <li className='monster'>
      {monster.name} ({monster.armor} Armor) ({monster.health.getCur()}/
      {monster.health.getMax()} Health) - Readying an attack for ?? damage
    </li>
  );
};

export default MonsterDisplay;
