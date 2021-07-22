import Phaser from 'phaser';
import { burningImageId } from '../Game';
import { statsTextStyle } from '../../const';

export class Burning extends Phaser.GameObjects.Image {
  valueText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, burningImageId);
    this.valueText = new Phaser.GameObjects.Text(scene, x - 25, y, '0', {
      ...statsTextStyle,
      fixedWidth: 50,
    }).setVisible(false);
    this.setDisplaySize(35, 50);
    scene.add.existing(this);
    scene.add.existing(this.valueText);
    this.setVisible(false);
  }

  destroy() {
    this.valueText.destroy();
    super.destroy();
  }

  updateValue = (val: number) => {
    if (val < 0) {
      this.setVisible(true);
      this.valueText.setText(Math.abs(val).toString()).setVisible(true);
    } else {
      this.setVisible(false);
      this.valueText.setVisible(false);
    }
  };
}
