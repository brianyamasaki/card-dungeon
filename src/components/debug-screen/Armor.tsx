import React from 'react';

interface FunctionProps {
  armor: number;
}
const Armor = ({ armor }: FunctionProps) => (
  <div>
    Armor: <span>{armor}</span>
  </div>
);

export default Armor;
