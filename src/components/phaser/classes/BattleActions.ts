import { Action, RAction } from './Action';
import { BattleActionsJson } from '../../../constJson';
import { CDMonster } from '../scenes/classes/CDMonster';
import { CDHero } from '../scenes/classes/CDHero';
import { BattleTarget } from './BattleTarget';

export type RBattleAction = {
  actionsCountMax: number;
  actions: RAction[];
};

export const initRBattleAction: RBattleAction = {
  actionsCountMax: 0,
  actions: [] as RAction[],
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
          hero.acceptAction(action);
          break;
        default:
          break;
      }
    });
  }

  public getRBattleAction(): RBattleAction {
    const { actionsCountMax } = this;
    return {
      actionsCountMax,
      actions: this.actions.map((action) => action.getRAction()),
    };
  }
}
