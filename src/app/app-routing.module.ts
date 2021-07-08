import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './four-o-four/four-o-four.component';


const routes: Routes = [
  { path: '', redirectTo: 'twenty-one', pathMatch: 'full'},
  { path: 'diff-cleaner', loadChildren: () => import('./diff-cleaner/diff-cleaner.module').then(m => m.DiffCleanerModule) },
  { path: 'twenty-one', loadChildren: () => import('./twenty-one/twenty-one.module').then(m => m.TwentyOneModule) },
  {
    path: '404',
    component: FourOFourComponent,
    data: {
      title: 'Page Does Not Exist',
      view: '404'
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: `/404`,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
