import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusDirective } from '../directives.ts/focus.directive';
import { CardComponent } from './card/card.component';
import { ShuffleCardsComponent } from './shuffle-cards/shuffle-cards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
  ],
  declarations: [
    CardComponent,
    FocusDirective,
    ShuffleCardsComponent,
  ],
  exports: [
    CardComponent,
    FocusDirective,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    ShuffleCardsComponent,
  ],
  entryComponents: [
    ShuffleCardsComponent
  ]
})
export class SharedModule { }
