import Phaser from 'phaser';

// Emitters allow us to publish 'signals' to anybody who subscribes to these signals.
// This allows us to run code anywhere in the application by just publishing a signal
//
//  To make an emitter we use this code
//  this.emitter=GameEmitter.getInstance();
//  this is guaranteed to only create one instance - all subsequent calls get the original instance
//
//  To Dispatch an Event from anywhere in the code
//  const emitter = GameEmitter.getInstance();
//  emitter.emit("SOME_UNIQUE_EVENT_STRING", optional_argument)
//
//  Listen for Events
//  const emitter = GameEmitter.on("SOME_UNIQUE_EVENT_STRING", (optional_argument) => {
//    do_something
//  })

export const GE_IncrementEffects = 'GE_IncrementEffects';
export const GE_DelExpiredEffects = 'GE_DELEGE_EXPIRED_EFFECTS';
export const GE_DamageMonsters = 'GE_DAMAGE_MONSTERS';
export const GE_DamageHero = 'GE_DAMAGE_HERO';
export const GE_GameOver = 'GE_Game_over';

let instance: GameEmitter | null = null;

export class GameEmitter extends Phaser.Events.EventEmitter {
  static getInstance(): GameEmitter {
    if (instance === null) {
      instance = new GameEmitter();
    }
    return instance;
  }
}
