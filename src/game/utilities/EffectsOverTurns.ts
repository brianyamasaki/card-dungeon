import { BattleAction } from "./BattleAction";

export class EffectsOverTurns {
  battleAction: BattleAction;
  currentIndex: number;
  effects: number[];
  expired = false;

  constructor(battleAction: BattleAction, effects: number[]) {
    this.battleAction = battleAction;
    this.currentIndex = 0;
    this.effects = effects;
  }

  // increment currentIndex and set expired if true
  public nextTurn() {
    if (this.expired) return;
    this.currentIndex += 1;
    if (this.currentIndex >= this.effects.length) {
      this.expired = true;
    }
  }

  public getDamage() {
    return this.effects[this.currentIndex];
  }

}