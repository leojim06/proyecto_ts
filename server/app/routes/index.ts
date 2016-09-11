import * as express from 'express';
import { HeroRoutes } from './hero-routes';
import { VillanoRoutes } from './villano-routes';
import { UserRoutes } from './user-routes';

const app = express();

export class Routes {
    public get routes(): express.Application {
        app.use("/api/heroes", new HeroRoutes().routes);
        app.use("/api/villanos", new VillanoRoutes().routes);
        app.use("/api/usuarios", new UserRoutes().routes);
        return app;
    }
}