import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeCellComponent } from './free-cell.component';
import { SharedModule } from '@shared/shared.module';
import { SolitaireRouting } from './free-cell.routing';
import { FreeCellStatsComponent } from './free-cell-stats/free-cell-stats.component';



@NgModule({
  declarations: [
    FreeCellComponent,
    FreeCellStatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolitaireRouting
  ]
})
export class FreeCellModule { }
