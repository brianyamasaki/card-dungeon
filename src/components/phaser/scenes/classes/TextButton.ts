import Phaser from 'phaser';
import { callBack } from '../../const';

const colorNormal = 'black';
const colorHover = 'blue';
const colorDown = 'red';
const buttonTextStyle = {
  fontFamily: 'Arial, sans serif',
  fontSize: '18px',
  color: colorNormal,
  align: 'center',
  backgroundColor: 'white',
};

export class TextButton extends Phaser.GameObjects.Text {
  buttonText: string;
  cb: callBack;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    width: number,
    cb: callBack
  ) {
    super(scene, x, y, text, { ...buttonTextStyle, fixedWidth: width });
    this.buttonText = text;
    this.cb = cb;
    this.setInteractive({ useHandCursor: true });

    this.on(Phaser.Input.Events.POINTER_OVER, this.onHover)
      .on(Phaser.Input.Events.POINTER_OUT, this.onLeave)
      .on(Phaser.Input.Events.POINTER_DOWN, this.onDown)
      .on(Phaser.Input.Events.POINTER_UP, this.onUp);
  }

  onHover() {
    this.setColor(colorHover);
  }

  onLeave() {
    this.setColor(colorNormal);
  }

  onDown() {
    this.setColor(colorDown);
  }

  onUp() {
    this.setColor(colorNormal);
    this.cb();
  }
}
