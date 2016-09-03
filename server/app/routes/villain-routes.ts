import * as express from 'express';
import { VillainController } from './../controllers/villain-controller';

const router = express.Router();

export class VillainRoutes {
    private _villainController: VillainController;

    constructor() {
        this._villainController = new VillainController();
    }

    public get routes(): express.Router {
        let controller = this._villainController;
        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.put('/:_id', controller.update);
        router.get('/:_id', controller.findById);
        router.delete('/:_id', controller.delete);
        return router
    }
}