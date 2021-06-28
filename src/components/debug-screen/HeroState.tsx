import React from 'react';
import Health from './Health';
import Armor from './Armor';
import Mana from './Mana';
import StatusEffects from './StatusEffects';
import Hero from '../../game/Hero';

interface FunctionProps {
  hero: Hero;
}

const HeroState = ({ hero }: FunctionProps) => (
  <div className='protagonist-state'>
    <Health health={hero.health} />
    <Armor armor={hero.armor} />
    <Mana />
    <StatusEffects />
  </div>
);

export default HeroState;
