import React from 'react';
import { Button } from 'reactstrap';
import { useSetRecoilState, useRecoilValue, SetterOrUpdater } from 'recoil';
import { RMonster } from '../../game/Monster';
import { BattleTarget } from '../../game/utilities/BattleTarget';
import { RAction } from '../../game/utilities/Action';
import { RCard } from '../../game/Card';
import { gameInterface } from '../../game/GameInterface';
import { gameStateAtom, heroIdState } from './recoilState';
import { RGameState } from '../../game/GameState';
import './CardActions.css';

interface FunctionProps {
  card: RCard;
  monsters: RMonster[];
}

const ActionButton = (
  card: RCard,
  action: RAction,
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
          gameInterface.playCardInHand(card, action, targetIds);
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
  action: RAction,
  setGameState: SetterOrUpdater<RGameState>,
  verb: string,
  monsters: RMonster[]
) => {
  return monsters.map((monster: RMonster, i) =>
    ActionButton(
      card,
      action,
      setGameState,
      [monster.id],
      `${verb} ${i + 1}`,
      i
    )
  );
};

const ActionButtons = (
  action: RAction,
  monsters: RMonster[],
  card: RCard,
  setGameState: SetterOrUpdater<RGameState>,
  heroId: number
) => {
  if (!gameInterface) return null;
  const monsterIds = monsters.map((monster) => monster.id);
  switch (action.target) {
    case BattleTarget.TargetAllEnemies:
      return ActionButton(
        card,
        action,
        setGameState,
        monsterIds,
        `${action.verb} All`,
        0
      );
    case BattleTarget.TargetEnemy:
      return (
        <span>
          {PerMonsterButtons(card, action, setGameState, action.verb, monsters)}
        </span>
      );
    case BattleTarget.TargetSelf:
    case BattleTarget.TargetHero:
      return ActionButton(card, action, setGameState, [heroId], 'Heal self', 0);
    default:
      return null;
  }
};

// Draws a list of possible actions that the card allows. Each action is followed by buttons
// allowing those actions on each monster allowed.
const CardActions = ({ card, monsters }: FunctionProps) => {
  const setGameState = useSetRecoilState(gameStateAtom);
  const heroId = useRecoilValue(heroIdState)
  const actionLines = card.battleActions.actions.map(
    (action: RAction, i: number) => (
      <li key={i}>
        <div>
          <span>{action.description}</span>
          <span>{ActionButtons(action, monsters, card, setGameState, heroId)}</span>
        </div>
      </li>
    )
  );
  return <ul className='card-actions'>{actionLines}</ul>;
};

export default CardActions;
