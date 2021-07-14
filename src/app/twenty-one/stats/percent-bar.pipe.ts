import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appPercentBar'
})
export class PercentBarPipe implements PipeTransform {
  transform(percent: number) {
    switch (true) {
      case percent <= .20:
        return 'bg-danger';
      case percent <= .40:
        return 'bg-warning';
      case percent <= .60:
        return 'bg-info';
      case percent <= .80:
        return '';
      default:
        return 'bg-success';
    }
  }
}
