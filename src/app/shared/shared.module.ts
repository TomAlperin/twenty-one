import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusDirective } from '@directives/focus.directive';
import { CardComponent } from './card/card.component';
import { ShuffleCardsComponent } from './shuffle-cards/shuffle-cards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';
import { FadeInDirective } from '@directives/fade.directive';
import { CardGroupComponent } from './card-group/card-group.component';
import { CardTalonComponent } from './card-talon/card-talon.component';
import { CardGroupPipe } from './card-group/card-group.pipe';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { WinComponent } from './win/win.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule,
  ],
  declarations: [
    CardComponent,
    CardGroupComponent,
    CardGroupPipe,
    CardTalonComponent,
    FadeInDirective,
    FocusDirective,
    NavComponent,
    ShuffleCardsComponent,
    SliderComponent,
    WinComponent,
  ],
  exports: [
    CardComponent,
    CardGroupComponent,
    CardGroupPipe,
    CardTalonComponent,
    FadeInDirective,
    FocusDirective,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    NavComponent,
    ShuffleCardsComponent,
    SliderComponent,
  ],
  entryComponents: [
    ShuffleCardsComponent,
    WinComponent
  ]
})
export class SharedModule { }
