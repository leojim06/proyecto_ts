import * as express from 'express';
import { HeroRoutes } from './hero-routes';
import { VillainRoutes } from './villain-routes';

const app = express();

export class Routes {
    public get routes(): express.Application {
        app.use("/api/heroes", new HeroRoutes().routes);
        app.use("/api/villains", new VillainRoutes().routes);
        return app;
    }
}