import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment } from '@environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';


const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   data: {
  //     view: 'dashboard',
  //     seo: {
  //       title: 'Technically Tom | Home',
  //       metaTags: [
  //         { name: 'description', content: 'Free to play card games.' },
  //         { property: 'og:title', content: 'Free to play card games' },
  //         { proprety: 'og:description', content: 'Free to play card games.' },
  //         { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
  //         { property: 'og:image:width', content: '1200' },
  //         { property: 'og:image:height', content: '630' },
  //         { property: 'og:url', content: environment.appUrl + '' },
  //         { name: 'twitter:card', content: 'website' },
  //       ]
  //     }
  //   }
  // },
  { path: '', loadChildren: () => import('./twenty-one/twenty-one.module').then(m => m.TwentyOneModule) },
  { path: 'solitaire', loadChildren: () => import('./solitaire/solitaire.module').then(m => m.SolitaireModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  {
    path: '404',
    component: FourOFourComponent,
    data: {
      view: 'fourofour',
      seo: {
        title: 'Page does not exist | Technically Tom',
        metaTags: [
          { name: 'description', content: 'Navigation error. Page does not exist.' },
          { property: 'og:title', content: 'Page does not exist | Technically Tom' },
          { proprety: 'og:description', content: 'Navigation error. Page does not exist.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
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
