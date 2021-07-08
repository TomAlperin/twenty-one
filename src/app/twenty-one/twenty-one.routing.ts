import { Routes, RouterModule } from '@angular/router';
import { TwentyOneComponent } from './twenty-one.component';

const twentyOneRoutes: Routes = [
  {
    path: '',
    component: TwentyOneComponent,
    data: {
      title: 'Twenty One',
      view: 'twenty-one'
    }
  }
];

export const TwentyOneRouting = RouterModule.forChild(twentyOneRoutes);
