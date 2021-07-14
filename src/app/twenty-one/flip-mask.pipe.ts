import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFlipMask'
})
export class FlipMaskPipe implements PipeTransform {
  transform(card: number, flip: boolean) {
    switch (flip) {
      case false:
        return 'back';
      case true:
        return card;
      default:
        return 'back';
    }
  }
}
