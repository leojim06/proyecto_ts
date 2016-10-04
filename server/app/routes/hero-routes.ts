import * as express from 'express';
import { HeroController } from './../controllers/hero-controller';
import { VerifyAuth } from './../middlewares/VerifyAuth';

const router = express.Router();

export class HeroRoutes {
    private _heroController: HeroController;
    private _verify: VerifyAuth;

    constructor() {
        this._heroController = new HeroController();
        this._verify = new VerifyAuth();
    }

    public get routes(): express.Router {
        let controller = this._heroController;
        router.get('/', controller.getAll);
        router.post('/', this._verify.verifyRole('SuperHeroe'), controller.create);
        router.get('/:_id', controller.findById);
        router.put('/:_id', this._verify.verifyRole('SuperHeroe'), controller.update);
        router.delete('/:_id', this._verify.verifyRole('SuperHeroe'), controller.delete);
        return router
    }
}