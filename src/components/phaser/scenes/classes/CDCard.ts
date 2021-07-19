import Phaser from 'phaser';
import GameScreen from '../Game';
import { handHeight, cardIdMin } from '../../const';
import { CardJson } from '../../../../constJson';
import { BattleActions } from '../../../../game/utilities/BattleActions';

const defaultDepth = 100;
const hoverDepth = 200;

export class CDCard extends Phaser.GameObjects.Sprite {
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

  constructor(scene: GameScreen, x: number, y: number, json: CardJson) {
    super(scene, x, y, json.imageUrl);
    this.scene = scene;
    this.faceTexture = json.imageUrl;
    this.setDepth(defaultDepth);

    const scaleFactor = handHeight / this.height;
    this.setScale(scaleFactor, scaleFactor);
    this.setInteractive({ useHandCursor: true, draggable: true });
    this.setData('isCard', true);

    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.onPointerOver)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.onPointerOut)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, this.onDragStart)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG, this.onDrag)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, this.onDragEnd);

    // non-Phaser data initialization

    this.id = CDCard.currentId++;
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
      this.setInteractive({ useHandCursor: isPlayable });
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

  public setPos = (x: number, y: number) => {
    this.x = x;
    this.y = y;
    this.setPosition(x, y);
    return this;
  };

  private onPointerOver = () => {
    this.setDepth(hoverDepth);
    // this.scene.tweens.add({
    //   targets: this,
    //   scale: 0.7,
    //   y: this.y - 80,
    //   ease: 'linear',
    //   duration: 150,
    // });
  };

  private onPointerOut = () => {
    this.setDepth(defaultDepth);
    // this.scene.tweens.add({
    //   targets: this,
    //   scale: this.originalScale,
    //   y: this.y,
    //   ease: 'linear',
    //   duration: 100,
    // });
  };

  private onDragStart = (
    pointer: Phaser.Input.Pointer,
    dragX: number,
    dragY: number
  ) => {
    this.dragStart = new Phaser.Geom.Point(this.x, this.y);
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
  };

  // non-Phaser
}
