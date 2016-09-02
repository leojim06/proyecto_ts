import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './components/hero/heroes.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';
import { HeroUpdateComponent } from './components/hero/hero-update.component';
import { HeroCreateComponent } from './components/hero/hero-create.component';

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
        component: HeroUpdateComponent
    },
    {
        path: 'hero/create',
        component: HeroCreateComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);