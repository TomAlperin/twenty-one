import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwentyOneRouting } from './twenty-one.routing';
import { TwentyOneComponent } from './twenty-one.component';
import { SharedModule } from '@shared/shared.module';
import { ActionCheckPipe } from './action-check.pipe';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { PercentBarPipe } from './stats/percent-bar.pipe';
import { FlipMaskPipe } from './flip-mask.pipe';

@NgModule({
  declarations: [
    TwentyOneComponent,
    ActionCheckPipe,
    BlackjackComponent,
    FlipMaskPipe,
    SettingsComponent,
    PercentBarPipe,
    StatsComponent
  ],
  imports: [
    CommonModule,
    TwentyOneRouting,
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BlackjackComponent,
    SettingsComponent,
    StatsComponent,
  ],
})
export class TwentyOneModule { }
