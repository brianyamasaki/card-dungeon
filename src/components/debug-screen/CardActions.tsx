import React from 'react';
import { Button } from 'reactstrap';
import { useSetRecoilState, SetterOrUpdater } from 'recoil';
import { RMonster } from '../../game/Monster';
import { RBattleAction, BattleTarget } from '../../game/utilities/BattleAction';
import { RCard } from '../../game/Card';
import { gameInterface } from '../../game/GameInterface';
import { gameStateAtom } from './recoilState';

import './CardActions.css';
import { RGameState } from '../../game/GameState';

interface FunctionProps {
  card: RCard;
  monsters: RMonster[];
}

const ActionButton = (
  card: RCard,
  battleAction: RBattleAction,
  setGameState: SetterOrUpdater<RGameState>,
  targetIds: number[],
  text: string,
  i: number
) => {
  return (
    <Button
      color='primary'
      size='sm'
      onClick={() => {
        if (gameInterface) {
          gameInterface.playCardInHand(card, battleAction, targetIds);
          setGameState(gameInterface.getGameState().getRGameState());
        }
      }}
      key={i}
    >
      {text}
    </Button>
  );
};

const PerMonsterButtons = (
  card: RCard,
  battleAction: RBattleAction,
  setGameState: SetterOrUpdater<RGameState>,
  verb: string,
  monsters: RMonster[]
) => {
  return monsters.map((monster: RMonster, i) =>
    ActionButton(
      card,
      battleAction,
      setGameState,
      [monster.id],
      `${verb} ${i + 1}`,
      i
    )
  );
};

const ActionButtons = (
  battleAction: RBattleAction,
  monsters: RMonster[],
  card: RCard,
  setGameState: SetterOrUpdater<RGameState>
) => {
  if (!gameInterface) return null;
  const monsterIds = monsters.map((monster) => monster.id);
  switch (battleAction.target) {
    case BattleTarget.TargetAllEnemies:
      return ActionButton(
        card,
        battleAction,
        setGameState,
        monsterIds,
        `${battleAction.verb} All`,
        0
      );
    case BattleTarget.TargetEnemy:
      return (
        <span>
          {PerMonsterButtons(
            card,
            battleAction,
            setGameState,
            battleAction.verb,
            monsters
          )}
        </span>
      );
    case BattleTarget.TargetSelf:
    case BattleTarget.TargetHero:
      return ActionButton(card, battleAction, setGameState, [], 'Heal self', 0);
    default:
      return null;
  }
};

// Draws a list of possible actions that the card allows. Each action is followed by buttons
// allowing those actions on each monster allowed.
const CardActions = ({ card, monsters }: FunctionProps) => {
  const setGameState = useSetRecoilState(gameStateAtom);
  const actionLines = card.actions.map((action: RBattleAction, i: number) => (
    <li key={i}>
      <div>
        <span>{action.description}</span>
        <span>{ActionButtons(action, monsters, card, setGameState)}</span>
      </div>
    </li>
  ));
  return <ul className='card-actions'>{actionLines}</ul>;
};

export default CardActions;
