import Phaser from 'phaser';

export class DropZone extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.setInteractive({ droppable: true });
    this.on(Phaser.Input.Events.GAMEOBJECT_DRAG_ENTER, this.onDragEnter)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_LEAVE, this.onDragLeave)
      .on(Phaser.Input.Events.GAMEOBJECT_DRAG_OVER, this.onDragOver)
      .on(Phaser.Input.Events.GAMEOBJECT_DROP, this.onDrop);
  }

  private onDragEnter = (
    pointer: Phaser.Input.Pointer,
    gameObject: Phaser.GameObjects.GameObject,
    target: Phaser.GameObjects.GameObject
  ) => {
    if (target === this) {
      console.log('drag enter');
    }
  };

  private onDragLeave = (
    pointer: Phaser.Input.Pointer,
    gameObject: Phaser.GameObjects.GameObject,
    target: Phaser.GameObjects.GameObject
  ) => {
    if (target === this) {
      console.log('drag leave');
    }
  };

  private onDragOver = (
    pointer: Phaser.Input.Pointer,
    gameObject: Phaser.GameObjects.GameObject,
    target: Phaser.GameObjects.GameObject
  ) => {
    if (target === this) {
      console.log('drag over');
    }
  };

  private onDrop = (
    pointer: Phaser.Input.Pointer,
    gameObject: Phaser.GameObjects.GameObject,
    target: Phaser.GameObjects.GameObject
  ) => {
    if (target === this) {
      console.log('drag over');
    }
  };
}
