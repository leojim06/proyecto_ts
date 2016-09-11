import * as express from 'express';
import { VillanoController } from './../controllers/villano-controller';

const router = express.Router();

export class VillanoRoutes {
    private _villanoController: VillanoController;

    constructor() {
        this._villanoController = new VillanoController();
    }

    public get routes(): express.Router {
        let controller = this._villanoController;
        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.get('/:_id', controller.findById);
        router.put('/:_id', controller.update);
        router.delete('/:_id', controller.delete);
        return router
    }
}