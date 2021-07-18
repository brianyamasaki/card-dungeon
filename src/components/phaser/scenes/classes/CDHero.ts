import Phaser from 'phaser';
import GameScreen from '../Game';
import Hero from '../../../../game/Hero';
import {
  heroHeight,
  heroWidth,
  nameTextStyle,
  statsTextStyle,
} from '../../const';

export class CDHero extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  hero: Hero;
  heroName: Phaser.GameObjects.Text;
  heroHealth: Phaser.GameObjects.Text;

  constructor(
    scene: GameScreen,
    x: number,
    y: number,
    texture: string,
    hero: Hero
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.hero = hero;
    // this.setDepth(defaultDepth);
    const minDim = Math.min(heroWidth, heroHeight);

    this.setDisplaySize(minDim, minDim);
    this.setData('isHero', true);
    scene.add.existing(this);
    this.heroName = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y - heroHeight / 2,
      hero.name,
      {
        ...nameTextStyle,
        fixedWidth: 250,
      }
    );
    this.heroHealth = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y + heroHeight / 2,
      `Health: ${hero.health.getCur()} / ${hero.health.getMax()}`,
      {
        ...statsTextStyle,
        fixedWidth: 250,
      }
    );
    scene.add.existing(this.heroName);
    scene.add.existing(this.heroHealth);
  }

  destroy() {
    this.heroHealth.destroy();
    this.heroName.destroy();
    super.destroy();
  }
}
