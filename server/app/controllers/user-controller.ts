import * as express from 'express';
import { UserBusiness } from '../business/user-business';
import { IBaseController } from './interfaces/base-controller';
import { IUsuarioDocument } from '../models/interfaces/IUsuario';

export class UserController implements IBaseController<UserBusiness> {
    getAll(req: express.Request, res: express.Response): void {
        try {
            let userBusiness = new UserBusiness();
            userBusiness.getAll((error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    result && result.length === 0 ?
                        res.status(404).send({ 'ERROR': 'No existen usuarios' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error })
        }
    }

    create(req: express.Request, res: express.Response) {
        try {
            let user: IUsuarioDocument = <IUsuarioDocument>req.body;
            let userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result: IUsuarioDocument) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    // no debe retornar el result porque contiene información sencible
                    res.status(201).send({ 'CREATED': user, 'RESULT': result });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    findById(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result: IUsuarioDocument) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Usuario no encontrado' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    update(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let usuario: IUsuarioDocument = <IUsuarioDocument>req.body;
            let userBusiness = new UserBusiness();
            userBusiness.update(_id, usuario, (error, result) => {
                error || (result && result.nModified === 0) ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Usuario no encontrado - no se puede actualizar' }) :
                        res.status(200).send({ 'UPDATED': usuario });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    delete(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Usuario no encontrado - no se puede eliminar' }) :
                        res.status(200).send({ 'DELETED': result })
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
}