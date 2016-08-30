import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './components/hero/heroes.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'detail/:_id',
        component: HeroDetailComponent
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);