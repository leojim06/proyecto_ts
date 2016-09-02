import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { IHero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
const alertify = require('alertify');



@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: IHero[];

    constructor(
        // private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private heroService: HeroService) { }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe((heroes: IHero[]) => {
                this.heroes = heroes;
                this.changeDetectorRef.markForCheck();
            },
            error => {
                console.log('Error: ' + error);
            });
    }

    deleteHero(hero: IHero): void {
        alertify
            .okBtn("Borrar")
            .cancelBtn("Cancelar")
            .confirm(`Desea borrar a ${hero.name}`, (ev) => {
                ev.preventDefault();
                this.heroService.deleteHero(hero._id)
                    .subscribe(() => { 
                        alertify.success(`Heroe Borado. Adios ${hero.name}`);
                        this.heroes.splice(this.heroes.indexOf(hero), 1);
                    },
                    error => { alertify.error(`Error Borrando al Heroe`); });
            }, (ev) => {
                ev.preventDefault();
                alertify.error(`Se canceló la eliminación de ${hero.name}`);
            });
    }
}