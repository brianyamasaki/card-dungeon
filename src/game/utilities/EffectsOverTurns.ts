import { BattleTarget } from "./BattleTarget";

export type REffectsOverTurns = {
  description: string;
  target: BattleTarget
  currentIndex: number;
  effects: number[];
}

export const initREffectsOverTurns:REffectsOverTurns = {
  description: '',
  target: BattleTarget.TargetAllEnemies,
  currentIndex: 0,
  effects: []
};

export class EffectsOverTurns {
  description: string;
  target: BattleTarget;
  currentIndex: number;
  effects: number[];
  expired = false;

  constructor(description: string, target: BattleTarget, effects: number[]) {
    this.description = description;
    this.target = target;
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
    if (this.expired) {
      return 0;
    }
    return this.effects[this.currentIndex];
  }

  public getREffectsOverTurns(): REffectsOverTurns {
    const { description, target, currentIndex, effects} = this;
    return {
      description,
      target,
      currentIndex,
      effects
    };
  }

}