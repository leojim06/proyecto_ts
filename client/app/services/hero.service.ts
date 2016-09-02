import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IHero } from '../models/hero';

import { ConfigService } from './config.service';

@Injectable()
export class HeroService {

    private heroUrl: string = '';

    constructor(
        private http: Http,
        private configService: ConfigService
    ) {
        this.heroUrl = `${configService.getApiURI()}/heroes`;
    }

    getHeroes(): Observable<IHero[]> {
        return this.http.get(this.heroUrl)
            .map((res: Response) => { return res.json(); })
            .catch(this.handleError);
    }

    getHero(_id: string): Observable<IHero> {
        return this.http.get(`${this.heroUrl}/${_id}`)
            .map((res: Response) => { return res.json(); })
            .catch(this.handleError);
    }

    createHero(hero: IHero): Observable<IHero> {

        let body = JSON.stringify(hero);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.heroUrl, body, options)
            .map((res: Response) => { return res.json(); })
            .catch(this.handleError);
    }

    updateHero(hero: IHero): Observable<IHero> {

        let body = hero;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.heroUrl}/${hero._id}`, hero, options)
            .map((res: Response) => { return res.json(); })
            .catch(this.handleError);
    }

    deleteHero(_id: string): Observable<void> {
        return this.http.delete(`${this.heroUrl}/${_id}`)
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let applicationError = error.headers.get('Application-Error');
        let serverError = error.json();
        let modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (let key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
}