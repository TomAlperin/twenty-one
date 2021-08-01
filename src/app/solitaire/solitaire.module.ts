import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolitaireComponent } from './solitaire.component';
import { SolitaireRouting } from './solitaire.routing';
import { SharedModule } from '@shared/shared.module';
import { SolitaireStatsComponent } from './solitaire-stats/solitaire-stats.component';



@NgModule({
  declarations: [
    SolitaireComponent,
    SolitaireStatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolitaireRouting
  ],
  entryComponents: [
    SolitaireStatsComponent
  ]
})
export class SolitaireModule { }
