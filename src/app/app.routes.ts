import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./Pages/Views/Public/public-module').then(m => m.PublicModule)
    },
    {
      path: 'secure',
      loadChildren: () => import('./Pages/Views/Secure/secure-module').then(m => m.SecureModule),
    }
];


