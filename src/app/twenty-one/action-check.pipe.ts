import { Pipe, PipeTransform } from '@angular/core';
import { TwentyoneGame } from '@models/twentyone-game';

@Pipe({
  name: 'actionCheck'
})
export class ActionCheckPipe implements PipeTransform {
  transform(game: TwentyoneGame, condition: string) {
    switch (condition) {
      case 'canDouble':
        return game.bet <= game.bank && game.userCards.length <= 2;
      case 'canDoubleSplit':
        return game.bet <= game.bank && game.splitCards.length <= 2;
      case 'canSplit':
        return game.state !== 'hit-on-split' && Math.floor(game.userCards[0] / 4) === Math.floor(game.userCards[1] / 4) &&
          game.bank >= game.bet &&
          game.userCards.length <= 2;
      case 'canInsure':
        return Math.floor(game.dealerCards[0] / 4) === 1 && game.bank >= game.bet / 2;
      case 'canSurrender':
        return (game.userCards.length < 3) && (game.splitCards.length === 0) && (game.bank >= game.bet / 2);
      default:
        return true;
    }
  }
}
