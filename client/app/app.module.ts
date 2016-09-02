import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroService } from './services/hero.service';
import { ConfigService } from './services/config.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HeroesComponent } from './components/hero/heroes.component';
import { HeroFormComponent } from './forms/hero-form.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';
import { HeroUpdateComponent } from './components/hero/hero-update.component';
import { HeroCreateComponent } from './components/hero/hero-create.component';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroesComponent,
        HeroFormComponent,
        HeroDetailComponent,
        HeroUpdateComponent,
        HeroCreateComponent,
    ],
    providers: [
        ConfigService,
        HeroService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }