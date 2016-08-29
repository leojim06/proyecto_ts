import * as express from 'express';
import { HeroRoutes } from './hero_routes';

const app = express();

export class Routes {
    public get routes(): express.Application {
        app.use("/api/heroes", new HeroRoutes().routes);
        return app;
    }
}