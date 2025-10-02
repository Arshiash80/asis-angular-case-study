import { type ResolveFn, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.components';

const titleResolver: ResolveFn<string> = async (route) => {
  // TEST: wait for 2 sec 
  await new Promise(resolve => setTimeout(resolve, 2000));
  return route.queryParams['something'] ?? 'Home';
}

export const homeRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: titleResolver,
  }
];
