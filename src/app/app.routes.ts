import { Routes } from '@angular/router';
import { BasedLayout } from './core/layout/based-layout/based-layout';
import { NotFound } from './modules/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';

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
    path: 'detail/:id',
    loadComponent: () =>
      import('./modules/employee/detail/detail').then((m) => m.Detail),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./modules/employee/edit/edit').then((m) => m.Edit),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login').then((m) => m.Login),
  },
  {
    path: 'employee',
    component: BasedLayout,
    canActivate: [authGuard],
    children: employeeRoutes,
  },
  { path: '**', component: NotFound },
];
