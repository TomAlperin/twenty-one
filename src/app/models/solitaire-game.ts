export type State = 'bet' | 'deal' | 'hit' | 'split' | 'hit-on-split';
export type Result = 'bet' | 'card-sound' | 'win' | 'lose' | 'tie' | 'blackjack' | 'bank-reset' | 'reset';

export class SolitaireGame {
  stock: number[] = [];
  talon: number[] = [];
  tableau: { card: number, flip: boolean }[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  foundation: number[][] = [
    [],
    [],
    [],
    []
  ];
  won = false;

  constructor(game: any = {}) {
    Object.assign(this, game);
  }
}
