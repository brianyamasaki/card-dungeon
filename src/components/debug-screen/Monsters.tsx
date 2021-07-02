import React from 'react';
import { useRecoilValue } from 'recoil';
import MonsterDisplay from './Monster';
import { RMonster } from '../../game/Monster';
import { monstersState } from './recoilState';

const Monsters = () => {
  const monsters: RMonster[] = useRecoilValue(monstersState);
  return (
    <ol>
      {monsters.map((monster, i) => (
        <MonsterDisplay monster={monster} key={i} />
      ))}
    </ol>
  );
};

export default Monsters;
