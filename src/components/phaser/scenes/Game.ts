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
import { Button } from './classes/Button';
import {
  startGameScreenId,
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
  callBack,
} from '../const';
import { TextButton } from './classes/TextButton';
import { DropZone } from './classes/DropZone';
import { AssetLibrary } from '../classes/AssetLibrary';
import { CDController } from './classes/CDContoller';
import { GameEmitter, GE_GameOver } from '../classes/GameEmitter';
import { BattleActions } from '../classes/BattleActions';

const backgroundImageId = 'backgroundImage';
const deckImageId = 'deckImage';
const discardImageId = 'discardImage';
const gameLostId = 'gameLostImage';
const gameWonId = 'gameWonImage';
export const burningImageId = 'burningImage';

// debug textures
const backButtonId = 'backButtonImage';
const backOverButtonId = 'backOverButtonImage';
const forwardButtonId = 'forwardButtonImage';
const forwardOverButtonId = 'forwardOverButtonImage';
const loadButtonId = 'loadButtonImage';
const loadOverButtonId = 'loadOverButtonImage';
const saveButtonId = 'saveButtonImage';
const saveOverButtonId = 'saveOverButtonImage';

// game textures are listed here and loaded at preload()
const gameTextures = [
  [backgroundImageId, `${phaserAssetsFolder}GameBackground.jpg`],
  [deckImageId, `${phaserAssetsFolder}Deck.png`],
  [discardImageId, `${phaserAssetsFolder}Discard.png`],
  [gameLostId, `${phaserAssetsFolder}GameLost.png`],
  [gameWonId, `${phaserAssetsFolder}GameWon.png`],
  [burningImageId, `${phaserAssetsFolder}Burning.png`],
];

const debugTextures = [
  [backButtonId, `${phaserAssetsFolder}Debug/Back.png`],
  [backOverButtonId, `${phaserAssetsFolder}Debug/Back-over.png`],
  [forwardButtonId, `${phaserAssetsFolder}Debug/Forward.png`],
  [forwardOverButtonId, `${phaserAssetsFolder}Debug/Forward-over.png`],
  [loadButtonId, `${phaserAssetsFolder}Debug/Load.png`],
  [loadOverButtonId, `${phaserAssetsFolder}Debug/Load-over.png`],
  [saveButtonId, `${phaserAssetsFolder}Debug/Save.png`],
  [saveOverButtonId, `${phaserAssetsFolder}Debug/Save-over.png`],
];

type BtnInfo = {
  x: number;
  y: number;
  texture: string;
  overTexture: string;
  fn: callBack;
  fnEnable?: callBack;
  button?: Button;
};

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
  arenaDropZone: DropZone | null = null;
  dragHighlight: Phaser.GameObjects.Rectangle | null = null;
  isDragging = false;
  controller: CDController | null = null;
  gameEmitter: GameEmitter;

  constructor() {
    super(gameScreenId);
    this.imageLibrary = new ImageLibrary();
    this.assetLibrary = new AssetLibrary();
    this.gameEmitter = GameEmitter.getInstance();
  }

  preload() {
    const allTextures = gameTextures.concat(debugTextures);
    allTextures.forEach((info) => {
      this.load.image(info[0], info[1]);
    });
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
      this.gameEmitter.on(GE_GameOver, this.gameOverScreen);
      this.createDebugButtons();
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

            // try to disable dropZones based on card dragged
            const { disableArena, disableMonsters } =
              BattleActions.disableDropZones(cdCard);
            if (this.arenaDropZone) {
              this.arenaDropZone.setDroppable(!disableArena);
            }
            if (this.monsterArea) {
              this.monsterArea.disableDropZones(!disableMonsters);
            }
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

  gameOverScreen = (obj: any) => {
    this.add.image(
      this.cameras.main.centerX,
      200,
      obj.gameWon ? gameWonId : gameLostId
    );
    this.input.on('pointerdown', () => {
      this.scene.start(startGameScreenId);
    });
  };

  createDebugButtons(): BtnInfo[] {
    const buttonDxy = 40;
    const debugButtons: BtnInfo[] = [
      {
        x: 800,
        y: 50,
        texture: backButtonId,
        overTexture: backOverButtonId,
        fn: () => {
          console.log('Back');
        },
      },
      {
        x: 850,
        y: 50,
        texture: forwardButtonId,
        overTexture: forwardOverButtonId,
        fn: () => {
          console.log('forward');
        },
      },
      {
        x: 900,
        y: 50,
        texture: loadButtonId,
        overTexture: loadOverButtonId,
        fn: () => {
          console.log('load');
        },
      },
      {
        x: 950,
        y: 50,
        texture: saveButtonId,
        overTexture: saveOverButtonId,
        fn: () => {
          console.log('save');
        },
      },
    ];

    debugButtons.forEach((btnInfo) => {
      const button = new Button(
        this,
        btnInfo.x,
        btnInfo.y,
        btnInfo.texture,
        buttonDxy,
        buttonDxy
      )
        .setOverTexture(btnInfo.overTexture)
        .on('pointerup', btnInfo.fn);
      btnInfo.button = button;
      this.add.existing(button);
    });
    return debugButtons;
  }
}
