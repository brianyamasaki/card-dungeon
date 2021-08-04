import { GameEmitter, GE_EndTurnRecorded } from './GameEmitter';
import { Recorder } from './Recorder';

type PlayModeIndex = {
  inPlayBack: boolean;
  turnIndex: number;
};

export class Playback {
  recorder: Recorder;
  playMode: PlayModeIndex = {
    inPlayBack: false,
    turnIndex: 0,
  };

  constructor(recorder: Recorder) {
    this.recorder = recorder;

    GameEmitter.getInstance().on(GE_EndTurnRecorded, this.onEndTurnRecorded);
  }

  // function must be "bound" to this
  onEndTurnRecorded = () => {
    console.log('turn ended');
  };

  inPlaybackMode(): boolean {
    const { inPlayBack, turnIndex } = this.playMode;
    return !inPlayBack || turnIndex < this.recorder.turns.length;
  }

  public enableUndo = () => {
    const inPlayBack = this.inPlaybackMode();
    return (
      (this.recorder.turns.length > 0 && !inPlayBack) ||
      (inPlayBack && this.playMode.turnIndex > 0)
    );
  };

  undo = () => {};
}
