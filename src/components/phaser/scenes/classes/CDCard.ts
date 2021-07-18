import Phaser from 'phaser';
import GameScreen from '../Game';
import { Card } from '../../../../game/Card';
import { handHeight } from '../../const';

const defaultDepth = 100;
const hoverDepth = 200;

export class CDCard extends Phaser.GameObjects.Sprite {
  faceTexture: string;
  flippedTexture: string = '';
  card: Card;
  scene: GameScreen;
  dragStart = new Phaser.Geom.Point(0, 0);

  constructor(
    scene: GameScreen,
    x: number,
    y: number,
    texture: string,
    card: Card
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.faceTexture = texture;
    this.card = card;
    this.setDepth(defaultDepth);

    const scaleFactor = handHeight / this.height;
    this.setScale(scaleFactor, scaleFactor);
    this.setInteractive({ useHandCursor: true, draggable: true });
    // scene.input.setDraggable(this);
    this.setData('isCard', true);

    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.onPointerOver)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.onPointerOut)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, this.onDragStart)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG, this.onDrag)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, this.onDragEnd);
  }

  public setFlippedTexture = (texture: string) => {
    this.flippedTexture = texture;
    return this;
  };

  public getCard = (): Card => {
    return this.card;
  };

  public setDraggable = (currentMana: number) => {
    const isPlayable = currentMana >= this.card.cost;
    if (this.input && this.input.draggable) {
      this.input.draggable = isPlayable;
      this.setInteractive({ useHandCursor: isPlayable });
    }
    if (!isPlayable) {
      this.alpha = 0.5;
    }
  };

  public setPos = (x: number, y: number) => {
    this.x = x;
    this.y = y;
    this.setPosition(x, y);
  };

  private onPointerOver = () => {
    this.setDepth(hoverDepth);
    // this.setTexture(this.flippedTexture);
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
    // this.setTexture(this.faceTexture);
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
}
