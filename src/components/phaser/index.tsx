import React from 'react';
import Phaser from 'phaser';
import Splash from './scenes/Splash';

interface FunctionProps {
  width: number;
  height: number;
}

const PHASER_PARENT_ID = 'phaser-parent';

export var phaserGame: Phaser.Game;

const PhaserComponent = ({ width, height }: FunctionProps) => {
  React.useEffect(() => {
    let config = {
      type: Phaser.AUTO,
      parent: PHASER_PARENT_ID,
      width,
      height,
      title: 'Card Dungeon',
      backgroundColor: '#303030',
      scene: Splash
    };
    phaserGame = new Phaser.Game(config);
  });
  return <div id={PHASER_PARENT_ID}></div>;
};

export default PhaserComponent;
