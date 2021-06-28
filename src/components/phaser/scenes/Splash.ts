import Phaser from 'phaser';

export default class Splash extends Phaser.Scene {
  preload = () => {
    this.load.image('splash', 'assets/phaser/Splash.png');
  }

  create = () => {
    // Splash screen image
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'splash');
  }
}