import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SolitaireComponent } from './solitaire.component';

const solitaireRoutes: Routes = [
  {
    path: '',
    component: SolitaireComponent,
    data: {
      view: 'solitaire',
      seo: {
        title: 'Technically Tom | Solitaire',
        metaTags: [
          { name: 'description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:title', content: 'Technically Tom\'s Solitaire' },
          { proprety: 'og:description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:url', content: environment.appUrl + 'solitaire' },
          { name: 'twitter:card', content: 'website' },
        ]
      }
    }
  }
];

export const SolitaireRouting = RouterModule.forChild(solitaireRoutes);
