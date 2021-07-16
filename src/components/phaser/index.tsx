import React from 'react';
import Phaser from 'phaser';
import Splash from './scenes/Splash';
import StartGame from './scenes/StartGame';
import GameScreen from './scenes/Game';

interface FunctionProps {
  width: number;
  height: number;
}

type State = {
  count: number;
};

const PHASER_PARENT_ID = 'phaser-parent';

export var phaserGame: Phaser.Game | null;

class PhaserComponent extends React.Component<FunctionProps, State> {
  state: State = {
    count: 0,
  };

  componentDidMount() {
    const { height, width } = this.props;
    let config = {
      type: Phaser.CANVAS,
      parent: PHASER_PARENT_ID,
      width,
      height,
      title: 'Card Dungeon',
      backgroundColor: '#303030',
      scene: [Splash, StartGame, GameScreen],
    };
    phaserGame = new Phaser.Game(config);
  }

  render() {
    return <div id={PHASER_PARENT_ID}></div>;
  }
}

export default PhaserComponent;
