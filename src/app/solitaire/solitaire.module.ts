import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolitaireComponent } from './solitaire.component';
import { SolitaireRouting } from './solitaire.routing';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    SolitaireComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolitaireRouting
  ]
})
export class SolitaireModule { }
