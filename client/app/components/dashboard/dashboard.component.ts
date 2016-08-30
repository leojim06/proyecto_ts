import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})


export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .subscribe((heroes: Hero[]) => {
                this.heroes = heroes;
            },
            error => {
                console.log('Error en el front-end')
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero._id];
        this.router.navigate(link);
    }
}