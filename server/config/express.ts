/// <reference path="../typings/index.d.ts" />
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan';

import { Routes } from '../app/routes';

export class App {
    private _app: express.Express;

    constructor() {
        this._app = express();
        this.configApp();
        this.setRoutes();
    }

    private setRoutes(): void {
        this._app.get('/', this._RenderHelloWorld);
        this._app.use(new Routes().routes);
    }

    public startServer(port: number): void {
        this._app.listen(port, () => {
            console.log(`Server listening on port: ${port}.`);
        });
    }

    private _RenderHelloWorld(req: express.Request, res: express.Response): void {
        res.send('Hello World!!!');
    }

    private configApp(): void {
        this._app.use(morgan('dev'));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
        this._app.use(function (req: express.Request, res: express.Response, next: express.NextFunction ) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });

    }
}