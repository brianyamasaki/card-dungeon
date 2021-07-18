import Phaser from 'phaser';
import {
  splashScreenId,
  startGameScreenId,
  phaserAssetsFolder,
} from '../const';

export default class Splash extends Phaser.Scene {
  constructor() {
    super(splashScreenId);
  }

  preload = () => {
    this.load.image('splash', `${phaserAssetsFolder}Splash.png`);
  };

  create = () => {
    // Splash screen image
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'splash'
    );

    // Text
    let textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'sans-serif',
      color: '#dd0000',
      align: 'center',
      fontSize: '24px',
    };
    this.add.text(
      this.cameras.main.centerX - 90,
      430,
      'Click to start game',
      textStyle
    );

    // catch pointerup event and switch to next scene
    this.input.on(
      'pointerup',
      () => {
        this.scene.start(startGameScreenId);
      },
      this
    );
  };

  clickHandler = () => {
    console.log('clicked');
    // this.game.scene.bringToTop(GameScene)
  };
}
