import * as express from 'express';
import { HeroController } from './../controllers/hero-controller';

const router = express.Router();

export class HeroRoutes {
    private _heroController: HeroController;

    constructor() {
        this._heroController = new HeroController();
    }

    public get routes(): express.Router {
        let controller = this._heroController;
        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.get('/:_id', controller.findById);
        router.put('/:_id', controller.update);
        router.delete('/:_id', controller.delete);
        return router
    }
}