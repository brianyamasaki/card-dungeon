import React from 'react';
import { useRecoilValue } from 'recoil';
import { manaState } from './recoilState';
import { RNumCurMax } from '../../game/utilities/NumCurMax';

const Mana = () => {
  const { cur, max }: RNumCurMax = useRecoilValue(manaState);
  return (
    <div>
      Mana: <span>{cur}</span>/<span>{max}</span>
    </div>
  );
};

export default Mana;
