import Phaser from 'phaser';
import { HandArea } from './classes/HandArea';
import { MonsterArea } from './classes/MonsterArea';
import { gameInterface } from '../../../game/GameInterface';
import GameState from '../../../game/GameState';
import { Card } from '../../../game/Card';
import { CDCard } from './classes/CDCard';
import { CDMonster } from './classes/CDMonster';
import { CDHero } from './classes/CDHero';
import { CDDeck } from './classes/CDDeck';
import { CDDiscard } from './classes/CDDiscard';
import { CDMana } from './classes/CDMana';
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

const backgroundImageId = 'backgroundImage';
const cardImageId = 'cardImage';
const cardFlippedImageId = 'cardFlippedImage';
const monsterImageId = 'monsterImage';
const heroImageId = 'heroImage';
const deckImageId = 'deckImage';
const discardImageId = 'discardImage';

export default class GameScreen extends Phaser.Scene {
  handArea: HandArea | null = null;
  gameState: GameState | null = null;
  monsterArea: MonsterArea | null = null;
  hero: CDHero | null = null;
  deck: CDDeck | null = null;
  discard: CDDiscard | null = null;
  mana: CDMana | null = null;
  endTurnButton: TextButton | null = null;
  arenaDropZone: Phaser.GameObjects.Rectangle | null = null;
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
    this.load.image(cardImageId, `${phaserAssetsFolder}Cards/Fortify.png`);
    this.load.image(cardFlippedImageId, `${phaserAssetsFolder}CardFlipped.png`);
    if (gameInterface && gameInterface.getGameState()) {
      const gameState = gameInterface.getGameState();
      // load monsters
      gameState.getMonsters().forEach((monster) => {
        const imgUrl = monster.imageUrl;
        if (imgUrl) {
          this.load.image(imgUrl, `${phaserAssetsFolder}${imgUrl}`);
        }
      });
    }
    this.load.image(
      monsterImageId,
      `${phaserAssetsFolder}/monsters/Enemy Piercer.png`
    );
    this.load.image(heroImageId, `${phaserAssetsFolder}/heroes/HeroCone.png`);
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
        const cdCards = this.createCdCards(this.gameState.getHand().getCards());
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
          this.createCdCards(this.gameState.getDeck().cards)
        );
        this.discard = new CDDiscard(
          this,
          discardXCtr,
          discardYCtr,
          discardImageId,
          this.createCdCards(this.gameState.getDiscard().cards)
        );
        this.mana = new CDMana(
          this,
          manaRectangle.left,
          manaRectangle.top,
          this.gameState.getMana()
        );
        this.endTurnButton = new TextButton(
          this,
          endTurnRectangle.left,
          endTurnRectangle.top,
          'End Turn',
          endTurnWidth,
          this.endTurn
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
    }
  };

  endTurn(): void {
    console.log('end turn pressed');
  }

  private createCdCards = (cards: Card[]): CDCard[] => {
    return cards.map((card) => {
      return new CDCard(this, 0, 0, cardImageId, card).setFlippedTexture(
        cardFlippedImageId
      );
    });
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
              // dropped on a monster
              const monster: CDMonster = dropZone as CDMonster;
              const centerPt = monster.getCenter();
              this.addDragHighlight(
                centerPt.x,
                centerPt.y,
                monster.width * monster.scaleX,
                monster.height * monster.scaleY
              );
            } else if (dropZone.getData('isArena')) {
              // dropped on game arena
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
              this.refreshGameState();
              this.removeDragHighlight();
            } else if (dropZone.getData('isArena')) {
              // dropped on arena
              this.moveHandCardToDiscard(cdCard, null);
              this.refreshGameState();
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
  private moveHandCardToDiscard = (cdCard: CDCard, cdMonster: CDMonster | null) => {
    if (this.handArea && this.discard && gameInterface) {
      const id = cdCard.card.id;
      let ids: number[] | null;
      if (cdMonster) {
        ids = [cdMonster.monster.id];
      } else {
        ids = null
      }
        // following moves the cards in Game engine
        gameInterface.controller.playCardInHand(cdCard.card, ids);  

      // we move the cdCard in the Phaser engine
      this.discard.addCard(this.handArea.removeCard(id));
    }
  };

  private refreshGameState = () => {
    const gameState = this.gameState;
    if (gameState) {
      this.handArea?.updateCards(gameState);
      // this.monsterArea
      // this.hero
      this.deck?.updateCount(gameState.getDeck().cards.length);
      this.discard?.updateCount(gameState.getDiscard().cards.length);
      this.mana?.updateToGameState(gameState.getMana());
    }
  };
}
