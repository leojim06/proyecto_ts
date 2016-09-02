import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .subscribe((heroes: IHero[]) => {
                this.heroes = heroes;
                this.topHeroes = this.heroes.slice(0, 3);
                this.changeDetectorRef.markForCheck();
            },
            error => {
                console.log('Error en el front-end')
            });
    }

    gotoDetail(hero: IHero): void {
        let link = ['/hero/detail', hero._id];
        this.router.navigate(link);
        // this.router.navigate(['/detail', hero._id]);
    }
}