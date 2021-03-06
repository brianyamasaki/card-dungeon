import Phaser from 'phaser';
import GameScreen from '../Game';
import { handHeight, cardIdMin } from '../../const';
import { CardJson } from '../../../../constJson';
import { BattleActions } from '../../classes/BattleActions';

const defaultDepth = 100;
const hoverDepth = 200;

export type CDCardRecord = {
  id: number;
  json: CardJson;
};

export class CDCard extends Phaser.GameObjects.Sprite {
  json: CardJson;
  faceTexture: string;
  scene: GameScreen;
  dragStart = new Phaser.Geom.Point(0, 0);
  // class data for initializing Card IDs
  private static currentId = cardIdMin;
  // non-Phaser data
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  cost: number;
  battleActions: BattleActions;
  isAddedToScene: boolean = false;
  isDragging: boolean = false;
  preDragScale: number = 1;
  preDragY: number = 0;

  constructor(scene: GameScreen, x: number, y: number, json: CardJson) {
    super(scene, x, y, json.imageUrl);
    this.scene = scene;
    this.faceTexture = json.imageUrl;
    this.setDepth(defaultDepth);
    this.json = json;

    const scaleFactor = handHeight / this.height;
    this.setScale(scaleFactor, scaleFactor);
    this.preDragScale = scaleFactor;
    this.setInteractive({ useHandCursor: true, draggable: true });
    this.setData('isCard', true);

    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.onPointerOver)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.onPointerOut)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, this.onDragStart)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG, this.onDrag)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, this.onDragEnd)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        console.log(`Pointer Down on ${this.id} named ${this.name}`);
      });

    // non-Phaser data initialization

    this.id = json.id ? json.id : CDCard.currentId++;
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.cost = json.cost;
    this.battleActions = new BattleActions(json.battleActions);
  }

  public setDraggable = (currentMana: number) => {
    const isPlayable = currentMana >= this.cost;
    if (this.input && this.input.draggable !== undefined) {
      this.input.draggable = isPlayable;
      this.setInteractive();
    } else {
      console.log('not draggable?');
    }
    this.alpha = isPlayable ? 1.0 : 0.5;
    return this;
  };

  public addToScene(scene: Phaser.Scene) {
    if (!this.isAddedToScene) {
      scene.add.existing(this);
      this.isAddedToScene = true;
    }
    return this;
  }

  public removeFromScene() {
    this.isAddedToScene = false;
  }

  public addToContainer(container: Phaser.GameObjects.Container) {
    container.add(this);
    return this;
  }

  public setPos = (x: number, y: number) => {
    this.x = x;
    this.y = y;
    this.preDragY = y;
    this.setPosition(x, y);
    return this;
  };

  private onPointerOver = () => {
    this.setDepth(hoverDepth);
  };

  private onPointerOut = () => {
    this.setDepth(defaultDepth);
  };

  private onDragStart = (
    pointer: Phaser.Input.Pointer,
    dragX: number,
    dragY: number
  ) => {
    this.dragStart = new Phaser.Geom.Point(this.x, this.y);
    this.isDragging = true;
  };

  private onDrag = (
    pointer: Phaser.Input.Pointer,
    dragX: number,
    dragY: number
  ) => {
    this.setX(dragX);
    this.setY(dragY);
  };

  private onDragEnd = () => {
    this.scene.tweens.add({
      targets: this,
      x: this.dragStart.x,
      y: this.dragStart.y,
      ease: 'linear',
      duration: 100,
    });
    this.isDragging = false;
  };

  // non-Phaser
  getRecord(): CDCardRecord {
    const { id, json } = this;
    return {
      id,
      json,
    };
  }
}
