import React from 'react';
import { useRecoilValue } from 'recoil';
import './StatusEffects.css';

import { strengthState, defenseState } from './recoilState';

const StatusEffects = () => {
  const strength = useRecoilValue(strengthState);
  const defense = useRecoilValue(defenseState);
  return (
    <div className='status-effects'>
      <div>
        <h5>Strength</h5>
        <span>{strength}</span>
      </div>
      <div>
        <h5>Defense</h5>
        <span>{defense}</span>
      </div>
    </div>
  );
};

export default StatusEffects;
