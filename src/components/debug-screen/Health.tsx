import React from 'react';
import NumCurMax from '../../game/utilities/NumCurMax';

interface FunctionProps {
  health: NumCurMax;
}

const Health = ({ health }: FunctionProps) => (
  <div>
    Health: <span>{health.getCur()}</span>/<span>{health.getMax()}</span>
  </div>
);

export default Health;
