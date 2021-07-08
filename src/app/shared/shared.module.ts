import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DealDirective } from '../directives.ts/deal.directive';
import { CardComponent } from './card/card.component';
import { ShuffleCardsComponent } from './shuffle-cards/shuffle-cards.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CardComponent,
    DealDirective,
    ShuffleCardsComponent,
  ],
  exports: [
    CardComponent,
    DealDirective,
    ShuffleCardsComponent,
  ],
  entryComponents: [
    ShuffleCardsComponent
  ]
})
export class SharedModule { }
