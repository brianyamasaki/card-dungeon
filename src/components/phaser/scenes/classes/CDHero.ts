import Phaser from 'phaser';
import GameScreen from '../Game';
import Hero from '../../../../game/Hero';
import { heroHeight, heroWidth } from '../../const';

export class CDHero extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  hero: Hero;
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
  }
}
