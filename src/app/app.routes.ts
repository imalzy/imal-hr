import { Routes } from '@angular/router';
import { Header } from './shared/header/header';

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
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'employee',
    component: Header,
    children: employeeRoutes,
  },
];
