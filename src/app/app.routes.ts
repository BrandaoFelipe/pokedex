import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon-details.page').then(m => m.PokemonDetailsPage)
  },
];