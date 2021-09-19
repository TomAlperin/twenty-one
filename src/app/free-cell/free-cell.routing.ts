import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FreeCellComponent } from './free-cell.component';

const solitaireRoutes: Routes = [
  {
    path: '',
    component: FreeCellComponent,
    data: {
      view: 'free-cell',
      seo: {
        title: 'FreeCell | Technically Tom',
        metaTags: [
          { name: 'description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:title', content: 'FreeCell | Technically Tom | Technically Tom\'s Free Cell' },
          { proprety: 'og:description', content: 'Free card game web app with support for playing off line.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/solitaire.jpg' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:url', content: environment.appUrl + 'free-cell' },
          { name: 'twitter:card', content: 'website' },
        ]
      }
    }
  }
];

export const SolitaireRouting = RouterModule.forChild(solitaireRoutes);
