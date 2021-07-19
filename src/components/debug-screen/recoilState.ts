import { atom, selector } from "recoil";
import { initRGameState, RGameState } from "../../game/GameState";

export const gameStateAtom = atom({
  key: 'gameStateAtom',
  default: initRGameState as RGameState
})

export const handState = selector({
  key: 'handState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hand;
  }
});

export const deckState = selector({
  key: 'deckState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.deck;
  }
});

export const discardState = selector({
  key: 'discardState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.discard;
  }
});

export const heroNameState = selector({
  key: 'heroNameSelector',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.name;
  }
});

export const monstersState = selector({
  key: 'monstersState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.monsters;
  }
});

export const strengthState = selector({
  key: 'strengthState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.strengthDelta;
  }
});

export const defenseState = selector({
  key: 'defenseState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.defenseDelta;
  }
});

export const healthState = selector({
  key: 'healthState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.health;
  }
});

export const manaState = selector({
  key: 'manaState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.mana;
  }
});

export const armorState = selector({
  key: 'armorState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.armor;
  }
});

export const heroIdState = selector ({
  key: 'heroIdState',
  get: ({get}) => {
    const gameState = get(gameStateAtom);
    return gameState.hero.id;
  }
})