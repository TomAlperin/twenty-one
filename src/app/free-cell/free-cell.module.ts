import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeCellComponent } from './free-cell.component';
import { SharedModule } from '@shared/shared.module';
import { SolitaireRouting } from './free-cell.routing';



@NgModule({
  declarations: [
    FreeCellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolitaireRouting
  ]
})
export class FreeCellModule { }
