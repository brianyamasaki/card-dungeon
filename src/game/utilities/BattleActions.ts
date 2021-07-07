import { Action, RAction, ActionJson } from "./Action";

export type BattleActionsJson = {
  actionsCountMax: number;
  actions: ActionJson[];
};

export type RBattleAction = {
  actionsCountMax: number;
  actions: RAction[];
};

export const initRBattleAction: RBattleAction = {
  actionsCountMax: 0,
  actions: [] as RAction[]
}

export class BattleActions {
  actionsCountMax: number;
  actions: Action[];

  constructor(json: BattleActionsJson) {
    this.actionsCountMax = json.actionsCountMax;
    if (this.actionsCountMax < 1) {
      console.error(`actionsCountMax can't be less than 1: found ${this.actionsCountMax}`);
    }
    this.actions = json.actions.map(actionJson => new Action(actionJson));
  }

  public getRBattleAction(): RBattleAction {
    const { actionsCountMax } = this;
    return {
      actionsCountMax,
      actions: this.actions.map(action => action.getRAction())
    };
  }
}