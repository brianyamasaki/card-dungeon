import { BattleAction } from "./BattleAction";

export default class Action {
  battleAction: BattleAction;
  targetIds: number[];

  constructor(battleAction: BattleAction, ids: number[]) {
    this.targetIds = ids;
    this.battleAction = battleAction;
  }
}