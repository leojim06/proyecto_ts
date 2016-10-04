import * as express from 'express';
import { UserController } from './../controllers/user-controller';
import { VerifyAuth } from './../middlewares/VerifyAuth';

const router = express.Router();

export class UserRoutes {
    private _userController: UserController;
    private _verify: VerifyAuth;

    constructor() {
        this._userController = new UserController();
        this._verify = new VerifyAuth();
    }

    public get routes(): express.Router {
        let controller = this._userController;
        router.get('/', controller.getAll);
        // router.post('/', controller.create);
        router.get('/:_id', controller.findById);
        // router.put('/:_id', controller.update);
        // router.delete('/:_id', controller.delete);
        return router
    }
}