import * as express from 'express';
import { VillainBusiness } from '../business/villain-business';
import { IBaseController } from './interfaces/base-controller';
import { IVillainModel } from '../models/interfaces/villain-model';

export class VillainController implements IBaseController<VillainBusiness> {
    create(req: express.Request, res: express.Response): void {
        try {
            let villain: IVillainModel = <IVillainModel>req.body;
            let villainBusiness = new VillainBusiness();
            villainBusiness.create(villain, (error, result) => {
                if (error) {
                    res.status(400).send({ "error": error });
                } else {
                    res.status(201).send({ "success": "Villano creado", "data": villain });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "error en su solicitud" });
        }
    }

    getAll(req: express.Request, res: express.Response): void {
        try {
            let villainBusiness = new VillainBusiness();
            villainBusiness.getAll((error, result) => {
                if (error) {
                    res.status(400).send({ "error": error });
                } else if (!result) {
                    res.status(404).send({ "error": "Villanos no encontrados" });
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "error en su solicitud" });
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            let villain: IVillainModel = <IVillainModel>req.body;
            let _id: string = req.params._id;
            let villainBusiness = new VillainBusiness();
            villainBusiness.update(_id, villain, (error, result) => {
                if (error) {
                    res.status(400).send({ "error": error });
                } else if (!result) {
                    res.status(404).send({ "error": "Villano no encontrado - no se puede actualizar" })
                } else {
                    res.status(200).send({ "success": "Villano actualizado" });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "error en su solicitud" });
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let villainBusiness = new VillainBusiness();
            villainBusiness.delete(_id, (error, result) => {
                if (error) {
                    res.status(400).send({ "error": error });
                } else if (!result) {
                    res.status(404).send({ "error": "Villano no encontrado - no se puede borrar" })
                } else {
                    res.status(200).send({ "success": "Villano borrado" });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "error en su solicitud" });
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let villainBusiness = new VillainBusiness();
            villainBusiness.findById(_id, (error, result) => {
                if (error) {
                    res.status(400).send({ "error": error });
                } else if (!result) {
                    res.status(404).send({ "error": "Villano no encontrado" });
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "error en su solicitud" });
        }
    }
}