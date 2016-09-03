import { Component } from'@angular/core';
import { Router } from '@angular/router';
const alertify = require('alertify');

import { HeroService } from '../../services/hero.service';
import { IHero } from '../../models/hero';
import { HeroFormComponent } from '../../forms/hero-form.component';

@Component({
    moduleId: module.id,
    selector: 'hero-create',
    template:
        `<div *ngIf="hero" >
            <hero-form 
                [hero] = "hero"
                (saveHero) = "onSave($event)">
            </hero-form>
        </div>`,
    directives: [HeroFormComponent]
})

export class HeroCreateComponent {

    private hero: IHero;

    constructor(
        private router: Router,
        private heroService: HeroService) {
        this.hero = {
            _id: '',
            name: '',
            power: '',
            amountPeopleSaved: 0
        }
    }

    onSave(hero: IHero): void {
        this.heroService.createHero(hero)
            .subscribe((heroCreated) => {
                alertify.success(`${hero.name}: Creado`);
                this.router.navigate(['heroes']);
            },
            error => {
                alertify.error(`Error creando Heroe ${hero.name}`);
            });
    }
}