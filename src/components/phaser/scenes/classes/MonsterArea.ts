import Phaser from 'phaser';
import { monsterRectangle } from '../../const';
import { CDMonster } from './CDMonster';

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

  public addMonsters = (monsters: CDMonster[]) => {
    const initialIndex = this.monsters.length;
    monsters.forEach((monster, i: number) => {
      monster.setData('monsterIndex', initialIndex + i);
    });
    this.monsters = this.monsters.concat(monsters);
    this.arrangeMonsters();
  };

  private arrangeMonsters = () => {
    const splits: xySize[] = [];
    const quarterWidth = this.width / 4;
    const quarterHeight = this.height / 4;
    switch (this.monsters.length) {
      case 1:
        splits.push({
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
        });
        break;
      case 2:
      case 3:
      case 4:
        splits.push({
          x: this.x - quarterWidth,
          y: this.y + quarterHeight,
          width: this.width / 2,
          height: this.height / 2,
        });
        splits.push({
          x: this.x + quarterWidth,
          y: this.y + quarterHeight,
          width: this.width / 2,
          height: this.height / 2,
        });
        splits.push({
          x: this.x - quarterWidth,
          y: this.y - quarterHeight,
          width: this.width / 2,
          height: this.height / 2,
        });
        splits.push({
          x: this.x + quarterWidth,
          y: this.y - quarterHeight,
          width: this.width / 2,
          height: this.height / 2,
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
