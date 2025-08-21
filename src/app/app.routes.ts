import {Routes} from '@angular/router';
import {Dashboard} from './pages/pages/dashboard/dashboard';
import {Trips} from './pages/pages/trips/trips';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'trips', component: Trips },
  { path: '**', redirectTo: '/dashboard' }
];
