export class Game {
  public state: 'bet' | 'deal' | 'hit' | 'split' | 'hit-on-split' = 'bet';
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

  constructor(game: any = {}) {
    Object.keys(this).forEach(key => {
      if (game[key] !== undefined) {
        this[key] = game[key];
      }
    });
  }
}
