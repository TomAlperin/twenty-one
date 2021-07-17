import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusDirective } from '../directives.ts/focus.directive';
import { CardComponent } from './card/card.component';
import { ShuffleCardsComponent } from './shuffle-cards/shuffle-cards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';
import { FadeInDirective } from '../directives.ts/fade.directive';

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
    FadeInDirective,
    FocusDirective,
    ShuffleCardsComponent,
    SliderComponent,
  ],
  exports: [
    CardComponent,
    FadeInDirective,
    FocusDirective,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    ShuffleCardsComponent,
    SliderComponent,
  ],
  entryComponents: [
    ShuffleCardsComponent
  ]
})
export class SharedModule { }
