import Phaser from 'phaser';
import { gameScreenId, phaserAssetsFolder } from '../const';
import { arrangeCards } from './gameUtils/handUtils';

const backgroundImageId = 'backgroundImage';
const cardImageId = 'cardImage';
const cardFlippedImageId = 'cardFlippedImage';

export type CDCard = {
  sprite: Phaser.GameObjects.Sprite;
  name: string;
};

export default class GameScreen extends Phaser.Scene {
  hand:CDCard[] = [];

  constructor() {
    super(gameScreenId)
  }

  preload() {
    this.load.image(backgroundImageId, `${phaserAssetsFolder}GameBackground.jpg`);
    this.load.image(cardImageId, `${phaserAssetsFolder}Card.png`);
    this.load.image(cardFlippedImageId, `${phaserAssetsFolder}CardFlipped.png`);
  }

  create = () => {
    // background image
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, backgroundImageId);

    this.addCardToHand('a');
    arrangeCards(this.hand);

    // catch pointerup event
    this.input.on('pointerup', () => {

      if (this.hand.length >= 10) {
        return;
      }
      this.addCardToHand('b');
      arrangeCards(this.hand);

    }, this);
    this.input.on('drag', function (pointer:Phaser.Input.Pointer, gameObject:Phaser.GameObjects.Sprite, dragX:number, dragY:number) {

      gameObject.x = dragX;
      gameObject.y = dragY;

  });
}

  addCardToHand = (name: string) => {
    let cardSprite = this.add.sprite(0, 0, cardImageId);   
    cardSprite.setInteractive();
    this.input.setDraggable(cardSprite);
    cardSprite.setScale(0.5, 0.5);
    this.hand.push({sprite: cardSprite, name});
    cardSprite.on('pointerover', () => {
      cardSprite.setDepth(1).setTexture(cardFlippedImageId);
    });
    cardSprite.on('pointerout', () => {
      cardSprite.setDepth(0).setTexture(cardImageId)
    })
  }

}