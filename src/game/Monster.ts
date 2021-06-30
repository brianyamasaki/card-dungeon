import { BattleAction, BattleActionJson } from './utilities/BattleAction';
import NumCurMax from './utilities/NumCurMax';

export type MonsterJson = {
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: number;
  actions: BattleActionJson[];
}

export const monsterIdMin = 1000;

export class Monster {
  static currentId = monsterIdMin;
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: NumCurMax;
  actions: BattleAction[];
  id: number;

  constructor(json:MonsterJson) {
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.armor = json.armor || 0;
    this.health = new NumCurMax(json.health);
    this.actions = json.actions.map((json: BattleActionJson) => new BattleAction(json));
    this.id = Monster.currentId++;
    if (!json.name || !json.description || json.armor === undefined || json.actions === undefined || json.health === undefined) {
      const str = `error loading Card - name:${this.name}, description:${this.description}, armor:${json.armor}, health:${json.health}, actions:${json.actions}`;
      console.error(str);
    }
  }

  // Getters and Setters TBD
}