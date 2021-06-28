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
  cardId: number,
  battleAction: BattleAction,
  targetIds: number[],
  text: string
) => {
  if (!gameInterface) return null;
  return (
    <Button
      color='primary'
      size='sm'
      onClick={(evt) => {
        gameInterface?.playCardInHand(
          cardId,
          new Action(battleAction, targetIds)
        );
      }}
    >
      {text}
    </Button>
  );
};

const PerMonsterButtons = (
  cardId: number,
  battleAction: BattleAction,
  verb: string,
  monsters: Monster[]
) => {
  return monsters.map((monster: Monster, i) =>
    ActionButton(cardId, battleAction, [monster.id], `${verb} ${i + 1}`)
  );
};

const ActionButtons = (
  battleAction: BattleAction,
  monsters: Monster[],
  cardId: number
) => {
  if (!gameInterface) return null;
  const monsterIds = monsters.map((monster) => monster.id);
  switch (battleAction.target) {
    case BattleTarget.TargetAllEnemies:
      return ActionButton(
        cardId,
        battleAction,
        monsterIds,
        `${battleAction.verb} All`
      );
    case BattleTarget.TargetEnemy:
      return (
        <span>
          {PerMonsterButtons(cardId, battleAction, battleAction.verb, monsters)}
        </span>
      );
    case BattleTarget.TargetSelf:
    case BattleTarget.TargetHero:
      return ActionButton(cardId, battleAction, [], 'Heal self');
    default:
      return null;
  }
};

// Draws a list of possible actions that the card allows. Each action is followed by buttons
// allowing those actions on each monster allowed.
const CardActions = ({ card, monsters }: FunctionProps) => {
  const actionLines = card.actions.map((action: BattleAction) => (
    <li>
      <div>
        <span>{action.description}</span>
        <span>{ActionButtons(action, monsters, card.id)}</span>
      </div>
    </li>
  ));
  return <ul className='card-actions'>{actionLines}</ul>;
};

export default CardActions;
