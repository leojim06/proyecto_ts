import * as express from 'express';
import { VillanoBusiness } from '../business/villano-business';
import { IBaseController } from './interfaces/base-controller';
import { IVillanoModel } from '../models/interfaces/villano-model';

export class VillanoController implements IBaseController<VillanoBusiness> {
    getAll(req: express.Request, res: express.Response): void {
        try {
            let villanoBusiness = new VillanoBusiness();
            villanoBusiness.getAll((error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    result && result.length == 0 ?
                        res.status(404).send({ 'ERROR': 'No existen villanos' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error })
        }
    }

    create(req: express.Request, res: express.Response) {
        try {
            let villano: IVillanoModel = <IVillanoModel>req.body;
            let villanoBusiness = new VillanoBusiness();
            villanoBusiness.create(villano, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    res.status(201).send({ 'CREATED': villano });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    findById(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let villanoBusiness = new VillanoBusiness();
            villanoBusiness.findById(_id, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Villano no encontrado' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    update(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let villano: IVillanoModel = <IVillanoModel>req.body;
            let villanoBusiness = new VillanoBusiness();
            villanoBusiness.update(_id, villano, (error, result) => {
                error || (result && result.nModified === 0) ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Villano no encontrado - no se puede actualizar' }) :
                        res.status(200).send({ 'UPDATED': villano });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    delete(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let villanoBusiness = new VillanoBusiness();
            villanoBusiness.delete(_id, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Villano no encontrado - no se puede eliminar' }) :
                        res.status(200).send({ 'DELETED': _id });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
}