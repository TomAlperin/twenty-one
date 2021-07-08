import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwentyOneRouting } from './twenty-one.routing';
import { TwentyOneComponent } from './twenty-one.component';
import { SharedModule } from '../shared/shared.module';
import { ActionCheckPipe } from './action-check.pipe';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    TwentyOneComponent,
    ActionCheckPipe,
    BlackjackComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TwentyOneRouting,
    SharedModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    BlackjackComponent,
    SettingsComponent
  ],
})
export class TwentyOneModule { }
