import Phaser from 'phaser';
import NumCurMax from '../../../../game/utilities/NumCurMax';
import { manaWidth, manaHeight } from '../../const';

const textStyle = {
  fontFamily: 'Arial, sans serif',
  fontSize: '16px',
  color: 'black',
  align: 'center',
  backgroundColor: 'white',
  fixedWidth: manaWidth,
  fixedHeight: manaHeight,
  padding: {
    y: 5,
  },
};
export class CDMana extends Phaser.GameObjects.Text {
  mana: NumCurMax;

  constructor(scene: Phaser.Scene, x: number, y: number, manaMax: number) {
    super(scene, x, y, `Energy:\n${manaMax} / ${manaMax}`, textStyle);

    this.mana = new NumCurMax(manaMax);
    scene.add.existing(this);
  }

  updateDisplay() {
    this.setText(`Energy:\n${this.mana.getCur()} / ${this.mana.getMax()}`);
    this.update();
  }

  // non-Phaser methods

  useMana(units: number) {
    this.mana.addToDelta(units);
    this.updateDisplay();
  }

  resetMana() {
    this.mana.resetToMax();
    this.updateDisplay();
  }

  getCur() {
    return this.mana.getCur();
  }
}
