import Phaser from 'phaser';

export class DropZone extends Phaser.GameObjects.Rectangle {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);

    this.setInteractive({ droppable: true });
    this.input.dropZone = true;
    this.setData('isDropZone', true);
    scene.add.existing(this);
  }

  public setDroppable(isDroppable: boolean) {
    this.input.dropZone = isDroppable;
    return this;
  }
}
