import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './four-o-four/four-o-four.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./diff-cleaner/diff-cleaner.module').then(m => m.DiffCleanerModule) },
  // {
  //   path: '',
  //   component: FourOFourComponent,
  //   children: []
  // },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
