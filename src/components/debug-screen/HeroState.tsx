import React from 'react';
import Health from './Health';
import Armor from './Armor';
import Mana from './Mana';
import StatusEffects from './StatusEffects';

const HeroState = () => {
  return (
    <div className='protagonist-state'>
      <Health />
      <Armor />
      <Mana />
      <StatusEffects />
    </div>
  );
};

export default HeroState;
