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
import { PercentBarPipe } from '@pipes/percent-bar.pipe';
import { LoadBarComponent } from './load-bar/load-bar.component';
import { UpdateNotesComponent } from './update-notes/update-notes.component';
import { FreeCellGroupComponent } from './free-cell-group/free-cell-group.component';
import { CardCellComponent } from './card-cell/card-cell.component';
import { FreeCellSelectPipe } from './free-cell-group/free-cell-select.pipe';

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
        FreeCellGroupComponent,
        FreeCellSelectPipe,
        CardCellComponent,
        NavComponent,
        PercentBarPipe,
        ShuffleCardsComponent,
        SliderComponent,
        WinComponent,
        UpdateNotesComponent,
        LoadBarComponent,
    ],
    exports: [
        CardComponent,
        CardGroupComponent,
        CardGroupPipe,
        CardTalonComponent,
        FadeInDirective,
        FocusDirective,
        FreeCellGroupComponent,
        CardCellComponent,
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
        PercentBarPipe,
        ShuffleCardsComponent,
        SliderComponent,
    ]
})
export class SharedModule { }
