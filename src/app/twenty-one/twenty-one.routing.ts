import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TwentyOneComponent } from './twenty-one.component';

const twentyOneRoutes: Routes = [
  {
    path: '',
    component: TwentyOneComponent,
    data: {
      view: 'twentyone',
      seo: {
        title: 'Technically Tom | Twenty One',
        metaTags: [
          { name: 'description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:title', content: 'Technically Tom\'s Twenty One' },
          { proprety: 'og:description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:url', content: environment.appUrl + 'twenty-one' },
          { name: 'twitter:card', content: 'website' },
        ]
      }
    }
  }
];

export const TwentyOneRouting = RouterModule.forChild(twentyOneRoutes);
