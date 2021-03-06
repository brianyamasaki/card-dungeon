import {
  BattleActions,
  RBattleAction,
} from '../components/phaser/classes/BattleActions';
import NumCurMax, { RNumCurMax } from '../components/phaser/classes/NumCurMax';
import { MonsterJson } from '../constJson';
import { monsterIdMin } from '../components/phaser/const';

export type RMonster = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: RNumCurMax;
  battleActions: RBattleAction;
};

export class Monster {
  static currentId = monsterIdMin;
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: NumCurMax;
  battleActions: BattleActions;
  id: number;

  constructor(json: MonsterJson) {
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.armor = json.armor || 0;
    this.health = new NumCurMax(json.health);
    this.battleActions = new BattleActions(json.battleActions);
    this.id = Monster.currentId++;

    if (
      !json.name ||
      !json.description ||
      json.armor === undefined ||
      json.battleActions === undefined ||
      json.health === undefined
    ) {
      const str = `error loading Card - name:${this.name}, description:${this.description}, armor:${json.armor}, health:${json.health}, battleActions:${json.battleActions}`;
      console.error(str);
    }
  }

  public getRMonster(): RMonster {
    const { id, name, description, imageUrl, armor } = this;

    return {
      id,
      name,
      description,
      imageUrl,
      armor,
      health: this.health.getRNumCurMax(),
      battleActions: this.battleActions.getRBattleAction(),
    };
  }

  // Getters and Setters TBD
  public healthEffect(effect: number) {
    this.health.causeDamage(effect);
  }
}
