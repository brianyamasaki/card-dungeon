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

  constructor(scene: Phaser.Scene, x: number, y: number, mana: NumCurMax) {
    super(
      scene,
      x,
      y,
      `Energy:\n${mana.getCur()} / ${mana.getMax()}`,
      textStyle
    );

    this.mana = mana;
    scene.add.existing(this);
  }

  updateToGameState(mana: NumCurMax) {
    this.setText(`Energy:\n${mana.getCur()} / ${mana.getMax()}`);
    this.update();
  }
}
