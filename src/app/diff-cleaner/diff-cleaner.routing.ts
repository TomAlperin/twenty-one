import { Routes, RouterModule } from '@angular/router';
import { DiffCleanerComponent } from './diff-cleaner.component';

const diffCleanerRoutes: Routes = [
  {
    path: '',
    component: DiffCleanerComponent,
    data: {
      title: 'Diff Cleaner',
      view: 'diffcleaner'
    }
  }
];

export const DiffCleanerRouting = RouterModule.forChild(diffCleanerRoutes);
