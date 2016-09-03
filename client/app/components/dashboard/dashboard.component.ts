import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IHero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})


export class DashboardComponent implements OnInit {

    heroes: IHero[] = [];
    topHeroes: IHero[];

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .subscribe((heroes: IHero[]) => {
                this.heroes = heroes;
                this.topHeroes = this.heroes.slice(0, 3);
            },
            error => {
                console.log('Error en el front-end')
            });
    }

    gotoDetail(hero: IHero): void {
        this.router.navigate(['/hero/detail', hero._id]);
    }
}