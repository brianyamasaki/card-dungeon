import { RBattleAction } from "./BattleAction";

export default class Action {
  battleAction: RBattleAction;
  targetIds: number[];

  constructor(battleAction: RBattleAction, ids: number[]) {
    this.targetIds = ids;
    this.battleAction = battleAction;
  }
}