import NumCurMax, { RNumCurMax } from '../components/phaser/classes/NumCurMax';
import {
  EffectsOverTurns,
  REffectsOverTurns,
} from '../components/phaser/classes/EffectsOverTurns';
import { HeroJson } from '../constJson';
import { heroIdMin } from '../components/phaser/const';

export type RHero = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  health: RNumCurMax;
  armor: number;
  strengthDelta: number;
  defenseDelta: number;
  healthEffectsOverTurns: REffectsOverTurns[];
};

export const initRHero: RHero = {
  id: 0,
  name: '',
  description: '',
  imageUrl: '',
  health: {
    cur: 0,
    max: 0,
  },
  armor: 0,
  strengthDelta: 0,
  defenseDelta: 0,
  healthEffectsOverTurns: [],
};

export default class Hero {
  static currentId = heroIdMin;
  name: string;
  description: string;
  imageUrl: string;
  health: NumCurMax;
  armor: number;
  strengthDelta: number;
  defenseDelta: number;
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
    if (
      !json.name ||
      !json.description ||
      json.armor === undefined ||
      json.health === undefined
    ) {
      const str = `error loading Hero - name:${this.name}, description:${this.description}, armor:${json.armor}, health:${json.health}`;
      console.error(str);
    }
  }

  public getRHero(): RHero {
    const {
      id,
      name,
      description,
      imageUrl,
      armor,
      strengthDelta,
      defenseDelta,
    } = this;

    return {
      id,
      name,
      description,
      imageUrl,
      armor,
      strengthDelta,
      defenseDelta,
      health: this.health.getRNumCurMax(),
      healthEffectsOverTurns: this.effectsOverTurns.map((effect) =>
        effect.getREffectsOverTurns()
      ),
    };
  }

  // getters and methods TBD

  public healthEffect(effect: number) {
    this.health.causeDamage(effect);
  }

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
