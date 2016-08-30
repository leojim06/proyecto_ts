import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './components/hero/heroes.component';
import { HeroDetailComponent } from './components/hero/hero-detail.component';
import { HeroService } from './services/hero.service';
import { ConfigService } from './services/config.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent
    ],
    providers: [
        ConfigService,
        HeroService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }