import React from 'react';
import { Monster } from '../../game/Monster';
import './Monster.css';

interface FunctionProps {
  monster: Monster;
}

const MonsterDisplay = ({ monster }: FunctionProps) => {
  const actions = monster.actions;
  const attackMsg = actions.length > 0 ? actions[0].description : 'no action';
  return (
    <li className='monster'>
      {monster.name} ({monster.armor} Armor) ({monster.health.getCur()}/
      {monster.health.getMax()} Health) - {attackMsg}
    </li>
  );
};

export default MonsterDisplay;
