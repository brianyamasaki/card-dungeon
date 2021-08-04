import Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Image {
  upTexture: string;
  overTexture: string;
  downTexture: string;
  isDiabled = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    width?: number,
    height?: number
  ) {
    super(scene, x, y, texture);
    this.upTexture = texture;
    this.overTexture = texture;
    this.downTexture = texture;
    if (typeof width === 'number' && typeof height === 'number') {
      this.setDisplaySize(width, height);
    }

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

  setDisabled(disable: boolean) {
    this.isDiabled = disable;
    if (disable) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
    return this;
  }

  private handleUp(pointer: Phaser.Input.Pointer) {
    if (this.isDiabled) {
      return;
    }
    this.handleOver(pointer);
  }

  private handleOut(pointer: Phaser.Input.Pointer) {
    this.setTexture(this.upTexture);
  }

  private handleDown(pointer: Phaser.Input.Pointer) {
    if (this.isDiabled) {
      return;
    }
    this.setTexture(this.downTexture);
  }

  private handleOver(pointer: Phaser.Input.Pointer) {
    if (this.isDiabled) {
      return;
    }
    this.setTexture(this.overTexture);
  }
}
