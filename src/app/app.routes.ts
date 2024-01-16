import { Routes } from '@angular/router';
import { MainLayoutComponent } from './common';
import { SelectModelComponent } from './stepcomponent/select-model/select-model.component';
import { ConfigComponent, SummaryComponent } from './stepcomponent';
export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'car'
  },
  {
      path: 'car',
      component: MainLayoutComponent,
      children: [
          {
              path: '',
              pathMatch: 'full',
              redirectTo: 'selection'
          },
          {
              path: 'selection',
              component: SelectModelComponent
          },
          {
              path: 'config',
              component: ConfigComponent
          },
          {
              path: 'summary',
              component: SummaryComponent
          }
      ]
  },
  {
      path: '**',
      redirectTo: 'car'
  }
];
