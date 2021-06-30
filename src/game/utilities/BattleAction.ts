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
  armorUp: number[]; //Armor is the first area where damage goes. it is removed at end of turn.
}

export class BattleAction {
  description: string;
  verb: string;
  target: BattleTarget;
  effectsOverTurns: EffectsOverTurns | null;
  armorEffectsOverTurns: EffectsOverTurns | null;

  constructor(json: BattleActionJson) {
    this.description = json.description;
    this.target = json.target;
    this.verb = json.verb;
    this.effectsOverTurns = json.effects ? new EffectsOverTurns(this, json.effects) : null;
    this.armorEffectsOverTurns = json.armorUp ? new EffectsOverTurns(this, json.armorUp) : null;
    if (json.description === undefined || !objBattleTarget[json.target] || json.verb === undefined) {
      const str = `error loading BattleAction - description:${json.description}, target:${json.target}, verb:${json.verb}, effects:${json.effects}`;
      console.error(str);
    }
  }


}