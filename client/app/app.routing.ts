import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './components/hero/heroes.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';
import { HeroFormComponent } from './components/hero/hero-form.component';

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
        path: 'hero/detail/:_id',
        component: HeroDetailComponent
    },
    {
        path: 'hero/edit/:_id',
        component: HeroFormComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);