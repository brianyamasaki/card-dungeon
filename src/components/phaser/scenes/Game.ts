import Phaser from 'phaser';
import { Button } from './classes/Button';
import { HandArea } from './classes/HandArea';
import { MonsterArea } from './classes/MonsterArea';
import { gameInterface } from '../../../game/GameInterface';
import GameState from '../../../game/GameState';
import { CDCard } from './classes/CDCard';
import { CDMonster } from './classes/CDMonster';
import { CDHero } from './classes/CDHero';
import {
  gameScreenId,
  phaserAssetsFolder,
  handXctr,
  handYctr,
  monsterXctr,
  monsterYctr,
  heroXCtr,
  heroYCtr,
} from '../const';

const backgroundImageId = 'backgroundImage';
const cardImageId = 'cardImage';
const cardFlippedImageId = 'cardFlippedImage';
const monsterImageId = 'monsterImage';
const heroImageId = 'heroImage';

export default class GameScreen extends Phaser.Scene {
  startButton: Button | null = null;
  handArea: HandArea | null = null;
  gameState: GameState | null = null;
  monsterArea: MonsterArea | null = null;
  hero: CDHero | null = null;
  isDragging = false;

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
      monsterImageId,
      `${phaserAssetsFolder}/monsters/Bulbasaur-monster.png`
    );
    this.load.image(heroImageId, `${phaserAssetsFolder}/heroes/Hero1.png`);
  }

  create = () => {
    // background image
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      backgroundImageId
    );
    this.handArea = new HandArea(this, handXctr, handYctr);
    this.monsterArea = new MonsterArea(this, monsterXctr, monsterYctr);
    if (gameInterface && this.handArea && this.monsterArea) {
      this.gameState = gameInterface.getGameState();
      if (this.gameState) {
        const monsters = this.gameState.getMonsters();
        const cdMonsters = monsters.map((monster) => {
          return new CDMonster(this, 0, 0, monsterImageId, monster);
        });
        this.monsterArea.addMonsters(cdMonsters);
        const cards = this.gameState.getHand().getCards();
        const cdCards = cards.map((card) => {
          return new CDCard(this, 0, 0, cardImageId, card).setFlippedTexture(
            cardFlippedImageId
          );
        });
        this.handArea.addCards(cdCards);
        this.hero = new CDHero(
          this,
          heroXCtr,
          heroYCtr,
          heroImageId,
          this.gameState.getHero()
        );
      }
    }
    this.input
      .on(
        'dragenter',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          if (gameObject.getData('isCard') && dropZone.getData('isMonster')) {
            // this.tweens.add({
            //   targets: gameObject,
            //   opacity: 1.0,
            //   scale: 0.5,
            //   duration: 50,
            // });
            const monster: CDMonster = dropZone as CDMonster;
            monster.setTint(0x00dd00);
          } else {
            console.log('dragenter');
          }
        }
      )
      .on(
        'dragleave',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          if (gameObject.getData('isCard') && dropZone.getData('isMonster')) {
            // this.tweens.add({
            //   targets: gameObject,
            //   opacity: 0.5,
            //   scale: 0.3,
            //   duration: 100,
            // });
          }
        }
      )
      .on(
        'dragstart',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          if (gameObject.getData('isCard')) {
            // this.tweens.add({
            //   targets: gameObject,
            //   opacity: 0.5,
            //   scale: 0.3,
            //   duration: 200,
            // });
          }
          this.isDragging = true;
        }
      )
      .on(
        'dragend',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          this.isDragging = false;
        }
      )
      .on(
        'drop',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          if (gameObject.getData('isCard') && dropZone.getData('isMonster')) {
            console.log('dropped on monster', dropZone.getData('monsterIndex'));
          }
        }
      );
  };
}
