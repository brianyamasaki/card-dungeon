import NumCurMax from "./utilities/NumCurMax";
import { EffectsOverTurns } from "./utilities/EffectsOverTurns";

export type HeroJson = {
  name: string;
  description?: string;
  imageUrl: string;
  health: number;
  armor: number
}

export const heroIdMin = 0;

export default class Hero {
  static currentId = heroIdMin;
  name: string;
  description: string;
  imageUrl: string;
  health: NumCurMax;
  armor: number;
  strengthDelta: number;
  defenseDelta:number;
  effectsOverTurns: EffectsOverTurns[];
  id: number;

  constructor(json: HeroJson) {
    this.id = Hero.currentId++;
    this.name = json.name;
    this.description = json.description || '';
    this.imageUrl = json.imageUrl;
    this.health = new NumCurMax(json.health);
    this.armor = json.armor;
    this.strengthDelta = 0;
    this.defenseDelta = 0;
    this.effectsOverTurns = [];
    if (!json.name || !json.description || json.armor === undefined || json.health === undefined) {
      const str = `error loading Hero - name:${this.name}, description:${this.description}, armor:${json.armor}, health:${json.health}`;
      console.error(str);
    }
  }

  // getters and methods TBD

  public getEffectsOverTurns() {
    return this.effectsOverTurns;
  }

  public getStrengthDelta() {
    return this.strengthDelta;
  }

  public getDefenseDelta() {
    return this.defenseDelta;
  }
}