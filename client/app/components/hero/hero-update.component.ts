import { Component, OnInit } from'@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

export class HeroUpdateComponent implements OnInit {

    private hero: IHero;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private heroService: HeroService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let _id = params['_id'];
            this.heroService.getHero(_id)
                .subscribe((hero: IHero) => { this.hero = hero; },
                error => { console.log(`Error: ${error}`) });
        });
    }

    onSave(hero: IHero): void {
        this.heroService.updateHero(hero)
            .subscribe((heroCreated) => {
                alertify.success(`${hero.name}: Modificado`);
                this.router.navigate(['heroes']);
            },
            error => {
                alertify.error(`Error al modificar Heroe ${hero.name}`);
            });
    }
}