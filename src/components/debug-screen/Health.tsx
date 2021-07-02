import React from 'react';
import { useRecoilValue } from 'recoil';
import { healthState } from './recoilState';

const Health = () => {
  const { cur, max } = useRecoilValue(healthState);
  return (
    <div>
      Health: <span>{cur}</span>/<span>{max}</span>
    </div>
  );
};

export default Health;
