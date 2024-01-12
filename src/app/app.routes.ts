import { Routes } from '@angular/router';
import { MainLayoutComponent } from './common';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'carmodel'
},
  {
    path: 'carmodel',
    component: MainLayoutComponent,
},
{
  path: '**',
  redirectTo: 'design'
}
];
