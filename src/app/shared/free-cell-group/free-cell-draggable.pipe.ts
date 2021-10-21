import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cardGroup' })
export class FCDraggablePipe implements PipeTransform {
  transform(card: number, nextCard: number) {
    return card;
  }
}
