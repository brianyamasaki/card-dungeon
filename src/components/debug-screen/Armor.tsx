import React from 'react';
import { useRecoilValue } from 'recoil';
import { armorState } from './recoilState';

const Armor = () => {
  const armor = useRecoilValue(armorState);
  return (
    <div>
      Armor: <span>{armor}</span>
    </div>
  );
};

export default Armor;
