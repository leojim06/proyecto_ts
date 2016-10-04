import * as express from 'express';
import { HeroRoutes } from './hero-routes';
import { VillanoRoutes } from './villano-routes';
import { UserRoutes } from './user-routes';
import { AuthRoutes } from './auth-routes';
import { VerifyAuth } from './../middlewares/verifyAuth';

const app = express();

export class Routes {
    private _verify: VerifyAuth;

    constructor() {
        this._verify = new VerifyAuth();
    }

    public get routes(): express.Application {
        // Rutas de autenticación
        app.use('/auth', new AuthRoutes().routes);

        // Rutas de la aplicación
        app.use('/api/heroes', this._verify.verifyLogin(), new HeroRoutes().routes);
        app.use('/api/villanos', this._verify.verifyLogin(), new VillanoRoutes().routes);
        app.use('/api/usuarios', this._verify.verifyLogin(), new UserRoutes().routes);
        return app;
    }
}