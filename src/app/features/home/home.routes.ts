import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';


export const homeRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'ASIS Case Study | Home',
  }
];
