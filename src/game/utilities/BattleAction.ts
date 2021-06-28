import { EffectsOverTurns } from "./EffectsOverTurns";

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
  effects: number[];
}

export class BattleAction {
  description: string;
  verb: string;
  target: BattleTarget;
  effectsOverTurns: EffectsOverTurns;

  constructor(json: BattleActionJson) {
    this.description = json.description;
    this.target = json.target;
    this.verb = json.verb;
    this.effectsOverTurns = new EffectsOverTurns(this, json.effects);
    if (json.description === undefined || !objBattleTarget[json.target] || json.verb === undefined || json.effects === undefined) {
      const str = `error loading BattleAction - description:${json.description}, target:${json.target}, verb:${json.verb}, effects:${json.effects}`;
      console.error(str);
    }
  }


}