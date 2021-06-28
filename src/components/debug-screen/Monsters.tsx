import React from 'react';
import Demon from './Monster';
import { Monster } from '../../game/Monster';

interface FunctionProps {
  monsters: Monster[];
}

const Monsters = ({ monsters }: FunctionProps) => {
  return (
    <ol>
      {monsters.map((monster, i) => (
        <Demon monster={monster} key={i} />
      ))}
    </ol>
  );
};

export default Monsters;
