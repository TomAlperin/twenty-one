import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffCleanerRouting } from './diff-cleaner.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { DiffCleanerComponent } from './diff-cleaner.component';

@NgModule({
  declarations: [
    DiffCleanerComponent
  ],
  imports: [
    CommonModule,
    DiffCleanerRouting,
    ReactiveFormsModule
  ]
})
export class DiffCleanerModule { }
