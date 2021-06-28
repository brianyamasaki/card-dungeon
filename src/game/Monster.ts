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

export class Monster {
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: NumCurMax;
  actions: BattleAction[];

  constructor(json:MonsterJson) {
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.armor = json.armor || 0;
    this.health = new NumCurMax(json.health);
    this.actions = json.actions.map((json: BattleActionJson) => new BattleAction(json));
  }

  // Getters and Setters TBD
}