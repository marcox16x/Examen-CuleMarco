import { Routes } from '@angular/router';
import { Reporte } from './pages/reporte/reporte';
import { Detalle } from './pages/detalle/detalle';

export const routes: Routes = [
  {
    path: '',
    component: Reporte
  },
  {
    path: 'detalle/:id',
    component: Detalle
  },
  {
    path: '**',
    redirectTo: ''
  }
];