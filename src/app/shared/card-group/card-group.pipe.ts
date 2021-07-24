import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardGroup'
})
export class CardGroupPipe implements PipeTransform {
  transform(cards: { card: number, flip: boolean }[]) {
    return cards.slice(1);
  }
}
