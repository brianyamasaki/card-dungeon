import Phaser from 'phaser';
import { gameScreenId, phaserAssetsFolder } from '../const';
import { Button } from './gameUtils/Button';
import GameInterface, { gameInterface } from '../../../game/GameInterface';

const backgroundImageId = 'backgroundImage';
const cardImageId = 'cardImage';
const cardFlippedImageId = 'cardFlippedImage';
const startButtonUpImageId = 'startButtonUpImage';
const startButtonOverImageId = 'startButtonOverImage';
const startButtonDownImageId = 'startButtonDownImage';

export type CDCard = {
  sprite: Phaser.GameObjects.Sprite;
  name: string;
};

export default class GameScreen extends Phaser.Scene {
  hand: CDCard[] = [];
  startButton: Button | null = null;

  constructor() {
    super(gameScreenId);
  }

  preload() {
    this.load.image(
      backgroundImageId,
      `${phaserAssetsFolder}GameBackground.jpg`
    );
    this.load.image(cardImageId, `${phaserAssetsFolder}Card.png`);
    this.load.image(cardFlippedImageId, `${phaserAssetsFolder}CardFlipped.png`);
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
        if (!gameInterface) {
          new GameInterface();
        }
      });
    this.add.existing(this.startButton);

    // this.addCardToHand('a');
    // arrangeCards(this.hand);

    // // catch pointerup event
    // this.input.on(
    //   'pointerup',
    //   () => {
    //     if (this.hand.length >= 10) {
    //       return;
    //     }
    //     this.addCardToHand('b');
    //     arrangeCards(this.hand);
    //   },
    //   this
    // );
    this.input.on(
      'drag',
      function (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
        dragX: number,
        dragY: number
      ) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );
  };

  update = () => {
    if (gameInterface) {
      this.startButton?.setVisible(false);
    }
  };

  addCardToHand = (name: string) => {
    let cardSprite = this.add.sprite(0, 0, cardImageId);
    cardSprite.setInteractive({ useHandCursor: true });
    this.input.setDraggable(cardSprite);
    cardSprite.setScale(0.5, 0.5);
    this.hand.push({ sprite: cardSprite, name });
    cardSprite.on('pointerover', () => {
      cardSprite.setDepth(1).setTexture(cardFlippedImageId);
    });
    cardSprite.on('pointerout', () => {
      cardSprite.setDepth(0).setTexture(cardImageId);
    });
  };
}
