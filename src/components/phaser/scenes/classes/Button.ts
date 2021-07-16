import Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Image {
  upTexture: string;
  overTexture: string;
  downTexture: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.upTexture = texture;
    this.overTexture = texture;
    this.downTexture = texture;

    this.setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleUp, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handleOut, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handleDown, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handleOver, this);
  }

  setUpTexture(texture: string) {
    this.upTexture = texture;
    return this;
  }

  setDownTexture(texture: string) {
    this.downTexture = texture;
    return this;
  }

  setOverTexture(texture: string) {
    this.overTexture = texture;
    return this;
  }

  private handleUp(pointer: Phaser.Input.Pointer) {
    this.handleOver(pointer);
  }

  private handleOut(pointer: Phaser.Input.Pointer) {
    this.setTexture(this.upTexture);
  }

  private handleDown(pointer: Phaser.Input.Pointer) {
    this.setTexture(this.downTexture);
  }

  private handleOver(pointer: Phaser.Input.Pointer) {
    this.setTexture(this.overTexture);
  }
}
