import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    private hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let _id = params['_id'];
            this.heroService.getHero(_id)
                .subscribe((hero: Hero) => {
                    this.hero = hero;
                },
                error => {
                    console.log('Error: ' + error);
                });
        });
    }

    goBack(): void {
        window.history.back();
    }
}