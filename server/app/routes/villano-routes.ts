import * as express from 'express';
import { VillanoController } from './../controllers/villano-controller';
import { VerifyAuth } from './../middlewares/VerifyAuth';

const router = express.Router();

export class VillanoRoutes {
    private _villanoController: VillanoController;
    private _verify: VerifyAuth;

    constructor() {
        this._villanoController = new VillanoController();
        this._verify = new VerifyAuth();
    }

    public get routes(): express.Router {
        let controller = this._villanoController;
        router.get('/', controller.getAll);
        router.post('/', this._verify.verifyRole('SuperVillano'), controller.create);
        router.get('/:_id', controller.findById);
        router.put('/:_id', this._verify.verifyRole('SuperVillano'), controller.update);
        router.delete('/:_id', this._verify.verifyRole('SuperVillano'), controller.delete);
        return router
    }
}