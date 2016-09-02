import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from '../services/hero.service';
import { IHero } from '../models/hero';

@Component({
    moduleId: module.id,
    selector: 'hero-form',
    templateUrl: 'hero-form.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class HeroFormComponent implements OnInit {

    heroFormTitle: string = 'Crear un nuevo Heroe';
    buttonTitle: string = 'Crear Heroe';

    heroForm: FormGroup;
    formError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    isCreate: boolean = true;

    @Input() hero: IHero;
    @Output() saveHero = new EventEmitter();

    constructor(
        private _fb: FormBuilder,
        private heroService: HeroService) {

        this.formError = {
            'name': '',
            'power': '',
            'amountPeopleSaved': ''
        };

        this._validationMessages = {
            'name': {
                'required': 'El nombre del Heroe es necesario',
                'minlength': 'El nombre no puede tener menos de 3 caracteres',
                'maxlength': 'El nombre no puede tener más de 50 caracteres'
            },
            'power': {
                'required': 'El poder del Heroe es necesario'
            },
            'amountPeopleSaved': {
                'required': 'El número de personas salvadas es necesario'
            }
        };
    }

    ngOnInit(): void {
        if (this.hero._id !== '') {
            this.heroFormTitle = 'Modificar Heroe';
            this.buttonTitle = 'Modificar Heroe';
            this.isCreate = !this.isCreate;
        }
        this.buildForm();
    }


    buildForm() {
        console.log(`Existe heroe?: ${typeof this.hero}`);

        this.heroForm = this._fb.group({
            name: [this.hero.name, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ])],
            power: [this.hero.power, Validators.required],
            amountPeopleSaved: [this.hero.amountPeopleSaved, Validators.required]
        });

        this.heroForm.valueChanges
            .map(value => { return value; })
            .subscribe(data => { this.onValueChanged(data) },
            error => { console.log(`error: ${error}`); });
    }

    onValueChanged(data: any): void {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.heroForm.controls[field].dirty // && !this.heroForm.controls[field].value;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.heroForm.controls[field].errors) {
                        if (this.heroForm.controls[field].errors.hasOwnProperty(key)) {
                            console.log(this.formError);
                            this.formError[field] += this._validationMessages[field][key] + ' ' + key;
                        }
                    }
                }
            }
        }
    }

    onSubmit(): void {
        let newHero: IHero;
        if (this.heroForm.dirty && this.heroForm.valid) {
            newHero = this.heroForm.value;
            if (!this.isCreate) {
                newHero._id = this.hero._id;
            }
            this.saveHero.emit(newHero)
        }
    }

    onCancel(): void {
        window.history.back();
    }
}