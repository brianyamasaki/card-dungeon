import Phaser from 'phaser';
import { HandArea } from './classes/HandArea';
import { MonsterArea } from './classes/MonsterArea';
import { CDCard } from './classes/CDCard';
import { CDMonster } from './classes/CDMonster';
import { CDHero } from './classes/CDHero';
import { CDDeck } from './classes/CDDeck';
import { CDDiscard } from './classes/CDDiscard';
import { CDMana } from './classes/CDMana';
import { ImageLibrary } from '../classes/ImageLibrary';
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
  manaRectangle,
  endTurnRectangle,
  endTurnWidth,
  arenaXCtr,
  arenaYCtr,
  arenaWidth,
  arenaHeight,
} from '../const';
import { TextButton } from './classes/TextButton';
import { DropZone } from './classes/DropZone';
import { AssetLibrary } from '../classes/AssetLibrary';
import { CDController } from './classes/CDContoller';

const backgroundImageId = 'backgroundImage';
const deckImageId = 'deckImage';
const discardImageId = 'discardImage';

export default class GameScreen extends Phaser.Scene {
  imageLibrary: ImageLibrary;
  assetLibrary: AssetLibrary;
  handArea: HandArea | null = null;
  monsterArea: MonsterArea | null = null;
  hero: CDHero | null = null;
  deck: CDDeck | null = null;
  discard: CDDiscard | null = null;
  mana: CDMana | null = null;
  endTurnButton: TextButton | null = null;
  arenaDropZone: Phaser.GameObjects.Rectangle | null = null;
  dragHighlight: Phaser.GameObjects.Rectangle | null = null;
  isDragging = false;
  controller: CDController | null = null;

  constructor() {
    super(gameScreenId);
    this.imageLibrary = new ImageLibrary();
    this.assetLibrary = new AssetLibrary();
  }

  preload() {
    this.load.image(
      backgroundImageId,
      `${phaserAssetsFolder}GameBackground.jpg`
    );
    this.load.image(deckImageId, `${phaserAssetsFolder}/Deck.png`);
    this.load.image(discardImageId, `${phaserAssetsFolder}/Discard.png`);
    this.imageLibrary.preload(this);
    this.assetLibrary.preload();
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
    if (this.handArea && this.monsterArea) {
      this.hero = new CDHero(
        this,
        heroXCtr,
        heroYCtr,
        this.assetLibrary.getRandomHero()
      );
      this.discard = new CDDiscard(
        this,
        discardXCtr,
        discardYCtr,
        discardImageId
      );
      this.mana = new CDMana(this, manaRectangle.left, manaRectangle.top, 3);
      this.deck = new CDDeck(this, deckXCtr, deckYCtr, deckImageId);
      this.controller = new CDController(
        this.imageLibrary,
        this.assetLibrary,
        this.handArea,
        this.monsterArea,
        this.hero,
        this.deck,
        this.discard,
        this.mana
      );
      let cdCards = this.assetLibrary
        .getAllCardsJson()
        .map((json) => new CDCard(this, 0, 0, json));
      cdCards = cdCards.concat(
        this.assetLibrary
          .getAllCardsJson()
          .map((json) => new CDCard(this, 0, 0, json))
      );
      this.controller
        .startGame(
          [
            new CDMonster(this, 0, 0, this.assetLibrary.getRandomMonster()),
            new CDMonster(this, 0, 0, this.assetLibrary.getRandomMonster()),
          ],
          cdCards
        )
        .startTurn();
      this.endTurnButton = new TextButton(
        this,
        endTurnRectangle.left,
        endTurnRectangle.top,
        'End Turn',
        endTurnWidth,
        this.controller.endTurn
      );
      this.arenaDropZone = new DropZone(
        this,
        arenaXCtr,
        arenaYCtr,
        arenaWidth,
        arenaHeight
      ).setData('isArena', true);
      this.setInputEvents();
    }
  };

  private setInputEvents = () => {
    this.input
      .on(
        'dragenter',
        (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.GameObject,
          dropZone: Phaser.GameObjects.GameObject
        ) => {
          if (gameObject.getData('isCard')) {
            if (dropZone.getData('isMonster')) {
              // dragged on a monster
              const monster: CDMonster = dropZone as CDMonster;
              const centerPt = monster.getCenter();
              this.addDragHighlight(
                centerPt.x,
                centerPt.y,
                monster.width * monster.scaleX,
                monster.height * monster.scaleY
              );
            } else if (dropZone.getData('isArena')) {
              // dragged on game arena
              this.addDragHighlight(
                arenaXCtr,
                arenaYCtr,
                arenaWidth,
                arenaHeight
              );
            }
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
          if (gameObject.getData('isCard')) {
            this.removeDragHighlight();
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
          this.removeDragHighlight();
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
          if (gameObject.getData('isCard')) {
            const cdCard = gameObject as CDCard;
            if (dropZone.getData('isMonster')) {
              // dropped on monster
              const cdMonster = dropZone as CDMonster;

              this.moveHandCardToDiscard(cdCard, cdMonster);
              this.removeDragHighlight();
            } else if (dropZone.getData('isArena')) {
              // dropped on arena
              this.moveHandCardToDiscard(cdCard, null);
              this.removeDragHighlight();
            }
          }
        }
      );
  };

  private addDragHighlight = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    this.dragHighlight = new Phaser.GameObjects.Rectangle(
      this,
      x,
      y,
      width,
      height,
      0xffffff,
      0.3
    );
    this.add.existing(this.dragHighlight);
  };

  private removeDragHighlight = () => {
    if (this.dragHighlight) {
      this.dragHighlight.destroy();
      this.dragHighlight = null;
    }
  };

  // handles moving CDCard from hand to Discard
  private moveHandCardToDiscard = (
    cdCard: CDCard,
    cdMonster: CDMonster | null
  ) => {
    if (this.controller) {
      this.controller.playCardInHand(cdCard, cdMonster ? cdMonster.id : null);
    }
  };
}
