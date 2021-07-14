import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FourOFourComponent } from './four-o-four/four-o-four.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./twenty-one/twenty-one.module').then(m => m.TwentyOneModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  {
    path: '404',
    component: FourOFourComponent,
    data: {
      view: 'fourofour',
      seo: {
        title: 'Technically Tom | Page does not exist',
        metaTags: [
          { name: 'description', content: 'Navigation error. Page does not exist.' },
          { property: 'og:title', content: 'Technically Tom | Page does not exist' },
          { proprety: 'og:description', content: 'Navigation error. Page does not exist.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
          { property: 'og:image:width', content: environment.appUrl + '1200' },
          { property: 'og:image:height', content: environment.appUrl + '630' },
          { property: 'og:url', content: environment.appUrl + '404' },
          { name: 'twitter:card', content: 'website' },
        ]
      }
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: `/404`,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
