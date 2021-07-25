import Phaser from 'phaser';
import { monsterRectangle } from '../../const';
import { CDHero } from './CDHero';
import { CDMonster } from './CDMonster';
import { GameEmitter, GE_GameOver } from '../../classes/GameEmitter';

type xySize = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export class MonsterArea {
  scene: Phaser.Scene;
  monsters: CDMonster[] = [];
  x: number;
  y: number;
  width: number;
  height: number;
  zones: Phaser.GameObjects.Zone[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = monsterRectangle.right - monsterRectangle.left;
    this.height = monsterRectangle.bottom - monsterRectangle.top;
  }

  // non-Phaser methods
  public addMonsters = (monsters: CDMonster[]) => {
    const initialIndex = this.monsters.length;
    monsters.forEach((monster, i: number) => {
      monster.setData('monsterIndex', initialIndex + i);
    });
    this.monsters = this.monsters.concat(monsters);
    this.arrangeMonsters();
  };

  public findMonsters = (ids: number[] | null): CDMonster[] => {
    const foundMonsters: CDMonster[] = [];
    if (ids === null) {
      return this.monsters;
    }
    this.monsters.forEach((monster) => {
      if (ids.indexOf(monster.id) !== -1) {
        foundMonsters.push(monster);
      }
    });
    return foundMonsters;
  };

  public chooseActions() {
    this.monsters.forEach((monster) => {
      monster.chooseAction();
    });
  }

  public checkForDeadMonsters() {
    const monstersStillAlive: CDMonster[] = [];
    const monstersDead: CDMonster[] = [];
    this.monsters.forEach((monster) => {
      if (monster.health.getCur() <= 0) {
        monstersDead.push(monster);
      } else {
        monstersStillAlive.push(monster);
      }
    });
    // remove dead monsters
    monstersDead.forEach((monster) => {
      monster.destroy();
    });
    // only keep alive monsters
    this.monsters = monstersStillAlive;
    if (monstersStillAlive.length === 0) {
      GameEmitter.getInstance().emit(GE_GameOver, { gameWon: true });
    }
    return this;
  }

  public resetArmor() {
    this.monsters.forEach((monster) => {
      monster.resetArmor();
    });
  }

  public attackHero(hero: CDHero) {
    this.monsters.forEach((monster) => {
      monster.attackHero(hero);
    });
  }

  public disableDropZones(droppable: boolean) {
    this.monsters.forEach((monster) => {
      monster.setDroppable(droppable);
    });
  }

  // Phaser method
  private arrangeMonsters = () => {
    const splits: xySize[] = [];
    const quarterWidth = this.width / 4;
    const quarterHeight = this.height / 4;
    const halfWidth = this.width / 2;
    const halfHeight = this.width / 2;
    switch (this.monsters.length) {
      case 0:
      case 1:
        splits.push({
          x: this.x - quarterWidth,
          y: this.y + quarterHeight,
          width: halfWidth,
          height: halfHeight,
        });
        break;
      case 2:
      case 3:
      case 4:
        splits.push({
          x: this.x - quarterWidth,
          y: this.y + quarterHeight,
          width: halfWidth,
          height: halfHeight,
        });
        splits.push({
          x: this.x + quarterWidth,
          y: this.y + quarterHeight,
          width: halfWidth,
          height: halfHeight,
        });
        splits.push({
          x: this.x - quarterWidth,
          y: this.y - quarterHeight,
          width: halfWidth,
          height: halfHeight,
        });
        splits.push({
          x: this.x + quarterWidth,
          y: this.y - quarterHeight,
          width: halfWidth,
          height: halfHeight,
        });
        break;
      default:
        console.error('must rewrite arrangeMonsters');
        break;
    }
    this.monsters.forEach((monster: CDMonster, i: number) => {
      const info = splits[i];
      const minDim = Math.min(info.width, info.height);
      monster.setPlace(info.x, info.y, minDim);
    });
  };
}
