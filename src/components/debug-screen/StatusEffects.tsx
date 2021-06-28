import React from 'react';
import { gameInterface } from '../../game/GameInterface';
import './StatusEffects.css';

const StatusEffects = () => {
  if (!gameInterface) return null;
  const gameState = gameInterface.getGameState();
  const hero = gameState.getHero();
  return (
    <div className='status-effects'>
      <div>
        <h5>Strength</h5>
        <span>{hero.getStrengthDelta()}</span>
      </div>
      <div>
        <h5>Defense</h5>
        <span>{hero.getDefenseDelta()}</span>
      </div>
    </div>
  );
};

export default StatusEffects;
