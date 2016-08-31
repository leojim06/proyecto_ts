import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { IHero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class HeroesComponent implements OnInit {

    heroes: IHero[];
    selectedHero: IHero;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe((heroes: IHero[]) => {
                this.heroes = heroes;
            },
            error => {
                console.log('Error: ' + error);
            });
    }

    // gotoDetail(hero: IHero): void {
    //     this.router.navigate(['hero/detail', hero._id]);
    // }

    // gotoEdit(hero: IHero): void {
    //     this.router.navigate(['hero/edit', hero._id]);
    // }
}