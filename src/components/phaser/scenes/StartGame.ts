import Phaser from 'phaser';
import { startGameScreenId, gameScreenId, phaserAssetsFolder } from '../const';
import { Button } from './classes/Button';
import GameInterface from '../../../game/GameInterface';

const backgroundImageId = 'backgroundImage';
const startButtonUpImageId = 'startButtonUpImage';
const startButtonOverImageId = 'startButtonOverImage';
const startButtonDownImageId = 'startButtonDownImage';

export default class StartGame extends Phaser.Scene {
  startButton: Button | null = null;

  constructor() {
    super(startGameScreenId);
  }

  preload() {
    this.load.image(
      backgroundImageId,
      `${phaserAssetsFolder}GameBackground.jpg`
    );
    this.load.image(
      startButtonUpImageId,
      `${phaserAssetsFolder}StartButton.png`
    );
    this.load.image(
      startButtonOverImageId,
      `${phaserAssetsFolder}StartButtonOver.png`
    );
    this.load.image(
      startButtonDownImageId,
      `${phaserAssetsFolder}StartButtonDown.png`
    );
  }

  create = () => {
    // background image
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      backgroundImageId
    );

    this.startButton = new Button(
      this,
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      startButtonUpImageId
    )
      .setDownTexture(startButtonDownImageId)
      .setOverTexture(startButtonOverImageId)
      .on('pointerup', () => {
        new GameInterface();
        this.scene.start(gameScreenId);
      });
    this.add.existing(this.startButton);
  };
}
