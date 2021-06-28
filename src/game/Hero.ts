import NumCurMax from "./utilities/NumCurMax";
import { DamageOverTurns } from "./utilities/DamageOverTurns";

export type HeroJson = {
  name: string;
  description?: string;
  imageUrl: string;
  health: number;
  armor: number
}

export default class Hero {
  name: string;
  description: string;
  imageUrl: string;
  health: NumCurMax;
  armor: number;
  strengthDelta: number;
  defenseDelta:number;
  damageOverTurns: DamageOverTurns[];

  constructor(json: HeroJson) {
    this.name = json.name;
    this.description = json.description || '';
    this.imageUrl = json.imageUrl;
    this.health = new NumCurMax(json.health);
    this.armor = json.armor;
    this.strengthDelta = 0;
    this.defenseDelta = 0;
    this.damageOverTurns = [];
  }

  // getters and methods TBD

  public getDamageOverTurns() {
    return this.damageOverTurns;
  }

  public getStrengthDelta() {
    return this.strengthDelta;
  }

  public getDefenseDelta() {
    return this.defenseDelta;
  }
}