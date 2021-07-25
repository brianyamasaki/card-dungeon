import { Action, RAction } from './Action';
import { BattleActionsJson } from '../../../constJson';
import { CDMonster } from '../scenes/classes/CDMonster';
import { CDHero } from '../scenes/classes/CDHero';
import { BattleTarget } from './BattleTarget';
import { CDCard } from '../scenes/classes/CDCard';

export type RBattleAction = {
  actionsCountMax: number;
  actions: RAction[];
};

export const initRBattleAction: RBattleAction = {
  actionsCountMax: 0,
  actions: [] as RAction[],
};

export type DisableDropInfo = {
  disableArena: boolean;
  disableMonsters: boolean;
};

export class BattleActions {
  actionsCountMax: number;
  actions: Action[];

  constructor(json: BattleActionsJson) {
    this.actionsCountMax = json.actionsCountMax;
    if (this.actionsCountMax < 1) {
      console.error(
        `actionsCountMax can't be less than 1: found ${this.actionsCountMax}`
      );
    }
    this.actions = json.actions.map((actionJson) => new Action(actionJson));
  }

  public playCard(monsters: CDMonster[], hero: CDHero) {
    this.actions.forEach((action) => {
      switch (action.target) {
        case BattleTarget.TargetEnemy:
          monsters.forEach((monster) => {
            monster.acceptAction(action);
          });
          break;
        case BattleTarget.TargetHero:
        case BattleTarget.TargetSelf:
          hero.acceptAction(action);
          break;
        default:
          break;
      }
    });
  }

  public static disableDropZones = (card: CDCard): DisableDropInfo => {
    let disableArena = false;
    let disableMonsters = false;
    card.battleActions.actions.forEach((action) => {
      switch (action.target) {
        case BattleTarget.TargetEnemy:
          disableArena = true;
          break;
        case BattleTarget.TargetHero:
        case BattleTarget.TargetSelf:
          if (action.verb.toLowerCase() !== 'heal') {
            disableMonsters = true;
          }
          break;
        default:
          break;
      }
    });

    if (!disableArena && !disableMonsters) {
      console.error(`Card ${card.name} deactivates all drop zones`);
    }

    return {
      disableArena,
      disableMonsters,
    };
  };

  public getRBattleAction(): RBattleAction {
    const { actionsCountMax } = this;
    return {
      actionsCountMax,
      actions: this.actions.map((action) => action.getRAction()),
    };
  }
}
