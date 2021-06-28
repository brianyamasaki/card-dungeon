import { DamageOverTurnsJson } from "./DamageOverTurns";

export enum BattleTarget {
  TargetSelf = 0,
  TargetEnemy = 1,
  TargetAllEnemies = 2,
  TargetHero = 3  
};

export type BattleActionJson = {
  description: string;
  target: BattleTarget;
  damage?: number;
  armor?: number;
  healing?:number;
  damageOverTurns?: DamageOverTurnsJson
}

export class BattleAction {
  description: string;
  target: BattleTarget;
  damage?: number;
  armor?: number;
  healing?:number;

  constructor(json: BattleActionJson) {
    this.description = json.description;
    this.target = json.target;
    this.damage = json.damage || 0;
    this.armor = json.armor || 0;
    this.healing = json.healing || 0;
  }


}