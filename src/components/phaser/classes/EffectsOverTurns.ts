import { BattleTarget } from './BattleTarget';
import { GameEmitter, GE_IncrementEffects } from './GameEmitter';

export type REffectsOverTurns = {
  description: string;
  target: BattleTarget;
  effect: number;
};

export const initREffectsOverTurns: REffectsOverTurns = {
  description: '',
  target: BattleTarget.TargetAllEnemies,
  effect: 0,
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
    GameEmitter.getInstance().on(GE_IncrementEffects, this.incrementIndex);
  }

  // increment currentIndex and set expired if true
  public incrementIndex = () => {
    if (this.expired || this.effects.length < 2) return;
    this.currentIndex += 1;
    if (this.currentIndex >= this.effects.length) {
      this.expired = true;
    }
  };

  public getDamage() {
    if (this.expired) {
      return 0;
    }
    return this.effects[this.currentIndex];
  }

  public effectsLength() {
    return this.effects.length;
  }

  public getREffectsOverTurns(): REffectsOverTurns {
    const { description, target } = this;
    this.getDamage();
    return {
      description,
      target,
      effect: this.getDamage(),
    };
  }
}
