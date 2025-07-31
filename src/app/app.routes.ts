import { Routes } from '@angular/router';
import { BasedLayout } from './core/layout/based-layout/based-layout';
import { NotFound } from './modules/not-found/not-found';

const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/employee/list/list').then((m) => m.List),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./modules/employee/create/create').then((m) => m.Create),
  },
  {
    path: '',
    loadComponent: () =>
      import('./modules/employee/detail/detail').then((m) => m.Detail),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login').then((m) => m.Login),
  },
  {
    path: 'employee',
    component: BasedLayout,
    children: employeeRoutes,
  },
  { path: '**', component: NotFound }
];
