import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      view: 'about',
      seo: {
        title: 'Technically Tom | About',
        metaTags: [
          { name: 'description', content: 'out page for Tom Alperin.' },
          { property: 'og:title', content: 'Technically Tom | About' },
          { proprety: 'og:description', content: 'About page for Tom Alperin.' },
          { property: 'og:image', content: environment.appUrl + 'assets/img/blackjack.jpg' },
          { property: 'og:image:width', content: environment.appUrl + '1200' },
          { property: 'og:image:height', content: environment.appUrl + '630' },
          { property: 'og:url', content: environment.appUrl + 'about' },
          { name: 'twitter:card', content: 'website' },
        ]
      }
    }
  }
];

export const AboutRoutingModule = RouterModule.forChild(aboutRoutes);
