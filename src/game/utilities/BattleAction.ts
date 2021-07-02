import { EffectsOverTurns, REffectsOverTurns } from "./EffectsOverTurns";

export enum BattleTarget {
  TargetSelf = "targetSelf",
  TargetEnemy = "targetEnemy",
  TargetAllEnemies = "targetAll",
  TargetHero = "targetHero"
  // if you add anything here, please add it to objBattleTarget for quick value checking
};

// Allows a fast check that battle target string is one of the above.
const objBattleTarget = {
  [BattleTarget.TargetSelf]: true,
  [BattleTarget.TargetEnemy]: true,
  [BattleTarget.TargetAllEnemies]: true,
  [BattleTarget.TargetHero]: true
};

export type BattleActionJson = {
  description: string;
  verb: string;
  target: BattleTarget;
  health: number[];
  armorUp: number[]; //Armor is the first area where damage goes. it is removed at end of turn.
}

export type RBattleAction = {
  description: string;
  verb: string;
  target: BattleTarget;
  healthEffects: REffectsOverTurns | null;
  armorUpEffects: REffectsOverTurns | null;
};

export const initRBattleAction = {
  description: '',
  verb: '',
  target: BattleTarget.TargetSelf,
  healthEffects: null,
  armorUpEffects: null
};

export class BattleAction {
  description: string;
  verb: string;
  target: BattleTarget;
  healthEffectsOverTurns: EffectsOverTurns | null;
  armorEffectsOverTurns: EffectsOverTurns | null;

  constructor(json: BattleActionJson) {
    this.description = json.description;
    this.target = json.target;
    this.verb = json.verb;
    this.healthEffectsOverTurns = json.health ? new EffectsOverTurns(this, json.health) : null;
    this.armorEffectsOverTurns = json.armorUp ? new EffectsOverTurns(this, json.armorUp) : null;
    if (json.description === undefined || !objBattleTarget[json.target] || json.verb === undefined) {
      const str = `error loading BattleAction - description:${json.description}, target:${json.target}, verb:${json.verb}, health:${json.health}`;
      console.error(str);
    }
  }

  public getRBattleAction(): RBattleAction {
    const { description, verb, target} = this;
    const healthEffects = this.healthEffectsOverTurns ? this.healthEffectsOverTurns.getREffectsOverTurns() : null;
    const armorUpEffects = this.armorEffectsOverTurns ? this.armorEffectsOverTurns.getREffectsOverTurns() : null;
    return {
      description,
      verb,
      target,
      healthEffects,
      armorUpEffects
    };
  }
}