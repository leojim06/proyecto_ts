import * as express from 'express';
import { Authentication } from '../../config/auth';

const router = express.Router();

export class AuthRoutes {
    private _authController: Authentication;

    constructor() {
        this._authController = new Authentication();
    }

    public get routes(): express.Router {
        let controller = this._authController;
        router.post('/login', controller.login);
        router.post('/registrar', controller.register);
        return router;
    }
}