import React from 'react';
import { Button } from 'reactstrap';
import { Monster } from '../../game/Monster';
import { BattleAction, BattleTarget } from '../../game/utilities/BattleAction';
import { Card } from '../../game/Card';
import Action from '../../game/utilities/Action';
import { gameInterface } from '../../game/GameInterface';

import './CardActions.css';

interface FunctionProps {
  card: Card;
  monsters: Monster[];
}

const ActionButton = (
  card: Card,
  battleAction: BattleAction,
  targetIds: number[],
  text: string,
  i: number
) => {
  if (!gameInterface) return null;
  return (
    <Button
      color='primary'
      size='sm'
      onClick={(evt) => {
        gameInterface?.playCardInHand(
          card,
          new Action(battleAction, targetIds)
        );
      }}
      key={i}
    >
      {text}
    </Button>
  );
};

const PerMonsterButtons = (
  card: Card,
  battleAction: BattleAction,
  verb: string,
  monsters: Monster[]
) => {
  return monsters.map((monster: Monster, i) =>
    ActionButton(card, battleAction, [monster.id], `${verb} ${i + 1}`, i)
  );
};

const ActionButtons = (
  battleAction: BattleAction,
  monsters: Monster[],
  card: Card
) => {
  if (!gameInterface) return null;
  const monsterIds = monsters.map((monster) => monster.id);
  switch (battleAction.target) {
    case BattleTarget.TargetAllEnemies:
      return ActionButton(
        card,
        battleAction,
        monsterIds,
        `${battleAction.verb} All`,
        0
      );
    case BattleTarget.TargetEnemy:
      return (
        <span>
          {PerMonsterButtons(card, battleAction, battleAction.verb, monsters)}
        </span>
      );
    case BattleTarget.TargetSelf:
    case BattleTarget.TargetHero:
      return ActionButton(card, battleAction, [], 'Heal self', 0);
    default:
      return null;
  }
};

// Draws a list of possible actions that the card allows. Each action is followed by buttons
// allowing those actions on each monster allowed.
const CardActions = ({ card, monsters }: FunctionProps) => {
  const actionLines = card.actions.map((action: BattleAction, i: number) => (
    <li key={i}>
      <div>
        <span>{action.description}</span>
        <span>{ActionButtons(action, monsters, card)}</span>
      </div>
    </li>
  ));
  return <ul className='card-actions'>{actionLines}</ul>;
};

export default CardActions;
