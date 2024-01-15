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
              redirectTo: 'select'
          },
          {
            path: 'select',
            component: SelectModelComponent
        },
        {
          path: 'configure',
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
