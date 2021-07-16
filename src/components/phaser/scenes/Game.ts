import Phaser from 'phaser';
import { Button } from './classes/Button';
import { HandArea } from './classes/HandArea';
import { MonsterArea } from './classes/MonsterArea';
import { gameInterface } from '../../../game/GameInterface';
import GameState from '../../../game/GameState';
import { CDCard } from './classes/CDCard';
import { CDMonster } from './classes/CDMonster';
import { CDHero } from './classes/CDHero';
import { CDDeck } from './classes/CDDeck';
import { CDDiscard } from './classes/CDDiscard';
import {
  gameScreenId,
  phaserAssetsFolder,
  handXctr,
  handYctr,
  monsterXctr,
  monsterYctr,
  heroXCtr,
  heroYCtr,
  deckXCtr,
  deckYCtr,
  discardXCtr,
  discardYCtr,
} from '../const';

const backgroundImageId = 'backgroundImage';
const cardImageId = 'cardImage';
const cardFlippedImageId = 'cardFlippedImage';
const monsterImageId = 'monsterImage';
const heroImageId = 'heroImage';
const deckImageId = 'deckImage';
const discardImageId = 'discardImage';

export default class GameScreen extends Phaser.Scene {
  startButton: Button | null = null;
  handArea: HandArea | null = null;
  gameState: GameState | null = null;
  monsterArea: MonsterArea | null = null;
  hero: CDHero | null = null;
  deck: CDDeck | null = null;
  discard: CDDiscard | null = null;
  dragHighlight: Phaser.GameObjects.Rectangle | null = null;
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
    this.load.image(deckImageId, `${phaserAssetsFolder}/Deck.png`);
    this.load.image(discardImageId, `${phaserAssetsFolder}/Discard.png`);
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
        this.deck = new CDDeck(
          this,
          deckXCtr,
          deckYCtr,
          deckImageId,
          this.gameState.getDeck()
        );
        this.discard = new CDDiscard(
          this,
          discardXCtr,
          discardYCtr,
          discardImageId,
          this.gameState.getDiscard()
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
            const monster: CDMonster = dropZone as CDMonster;
            const centerPt = monster.getCenter();
            this.dragHighlight = new Phaser.GameObjects.Rectangle(
              this,
              centerPt.x,
              centerPt.y,
              monster.width * monster.scaleX,
              monster.height * monster.scaleY,
              0xffffff,
              0.3
            );
            this.add.existing(this.dragHighlight);
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
            if (this.dragHighlight) {
              this.dragHighlight.destroy();
              this.dragHighlight = null;
            }
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
            const cdCard = gameObject as CDCard;
            cdCard.alpha = 0.2;
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
          const cdCard = gameObject as CDCard;
          cdCard.alpha = 1;
          if (this.dragHighlight) {
            this.dragHighlight.destroy();
            this.dragHighlight = null;
          }
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
