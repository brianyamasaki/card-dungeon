import React from 'react';
import { Button } from 'reactstrap';
import { Monster } from '../../game/Monster';
import { BattleAction, BattleTarget } from '../../game/utilities/BattleAction';

import './CardActions.css';

interface FunctionProps {
  actions: BattleAction[];
  monsters: Monster[];
}

const ActionButton = (text: string) => {
  return (
    <Button color='primary' size='sm'>
      {text}
    </Button>
  );
};

const PerMonsterButtons = (verb: string, monsters: Monster[]) => {
  return monsters.map((monster: Monster, i) =>
    ActionButton(`${verb} ${i + 1}`)
  );
};

const ActionButtons = (action: BattleAction, monsters: Monster[]) => {
  switch (action.target) {
    case BattleTarget.TargetAllEnemies:
      return ActionButton('Attack All Monsters');
    case BattleTarget.TargetEnemy:
      return <span>{PerMonsterButtons('Attack', monsters)}</span>;
    case BattleTarget.TargetSelf:
    case BattleTarget.TargetHero:
      return ActionButton('Heal self');
    default:
      return null;
  }
};

const CardActions = ({ actions, monsters }: FunctionProps) => {
  const actionLines = actions.map((action: BattleAction) => (
    <li>
      <div>
        <span>{action.description}</span>
        <span>{ActionButtons(action, monsters)}</span>
      </div>
    </li>
  ));
  return <ul className='card-actions'>{actionLines}</ul>;
};

export default CardActions;
