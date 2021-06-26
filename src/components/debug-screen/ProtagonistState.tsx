import React from 'react';
import Health from './Health';
import Armor from './Armor';
import Mana from './Mana';

const ProtagonistState = () => (
  <div className='protagonist-state'>
    <h4>My Stats</h4>
    <Health />
    <Armor />
    <Mana />
  </div>
);

export default ProtagonistState;
