import { BattleAction } from "./BattleAction";

export type REffectsOverTurns = {
  battleAction: BattleAction;
  currentIndex: number;
  effects: number[];
}

export const initREffectsOverTurns = {
  battleAction: {
    description: '',
    verb: '',
    target: 0,
    healthEffects: null,
    armorUpEffects: null
  },
  currentIndex: 0,
  effects: []
};

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

  public getREffectsOverTurns(): REffectsOverTurns {
    const { battleAction, currentIndex, effects} = this;
    return {
      battleAction,
      currentIndex,
      effects
    };
  }

}