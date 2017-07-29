import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
