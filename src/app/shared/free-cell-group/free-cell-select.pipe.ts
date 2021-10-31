import { Pipe, PipeTransform } from '@angular/core';
import { FreeCellGroupComponent } from './free-cell-group.component';

@Pipe({
  name: 'appCellSelect',
  pure: false
})
export class FreeCellSelectPipe implements PipeTransform {
  transform(freeCells: number[], index: number, draggable: boolean, group: FreeCellGroupComponent) {
    const length = freeCells.filter(cell => cell === 0).length;
    return draggable && index <= length && (!group || group.draggable);
  }
}
