import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwentyOneRouting } from './twenty-one.routing';
import { TwentyOneComponent } from './twenty-one.component';
import { SharedModule } from '@shared/shared.module';
import { ActionCheckPipe } from './action-check.pipe';
import { SettingsComponent } from '../shared/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TwentyoneStatsComponent } from './twenty-one-stats/twenty-one-stats.component';
import { FlipMaskPipe } from './flip-mask.pipe';
import { TwentyOneHelpComponent } from './twenty-one-help/twenty-one-help.component';

@NgModule({
  declarations: [
    TwentyOneComponent,
    ActionCheckPipe,
    FlipMaskPipe,
    SettingsComponent,
    TwentyoneStatsComponent,
    TwentyOneHelpComponent,
  ],
  imports: [
    CommonModule,
    TwentyOneRouting,
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    SettingsComponent,
    TwentyoneStatsComponent,
  ],
})
export class TwentyOneModule { }
