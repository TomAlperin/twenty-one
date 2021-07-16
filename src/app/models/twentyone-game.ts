export type State = 'bet' | 'deal' | 'hit' | 'split' | 'hit-on-split';
export type Result = 'bet' | 'card-sound' | 'win' | 'lose' | 'tie' | 'blackjack' | 'bank-reset' | 'reset';

export class TwentyoneGame {
  public state: State = 'bet';
  public bank = 1000;
  public bet = 0;
  public splitBet = 0;
  public deck: number[] = [];
  public dealerCards: number[] = [];
  public userCards: number[] = [];
  public splitCards: number[] = [];
  public canInsure = false;
  public insured = false;
  public split = false;
  public doubled = false;
  public splitDoubled = false;
  public result = '';
  public icon: string = null;
  public splitResult = '';
  public splitIcon: string = null;
  public new?: boolean;

  constructor(game: any = {}) {
    this.new = true;
    Object.assign(this, game);
  }
}
