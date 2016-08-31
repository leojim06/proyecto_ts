import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './components/hero/heroes.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';
import { HeroService } from './services/hero.service';
import { ConfigService } from './services/config.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HeroFormComponent } from './components/hero/hero-form.component';

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
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroFormComponent
    ],
    providers: [
        ConfigService,
        HeroService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }