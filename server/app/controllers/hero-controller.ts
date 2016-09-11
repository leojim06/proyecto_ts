import * as express from 'express';
import { HeroBusiness } from '../business/hero-business';
import { IBaseController } from './interfaces/base-controller';
import { IHeroModel } from '../models/interfaces/hero-model';

export class HeroController implements IBaseController<HeroBusiness> {
    getAll(req: express.Request, res: express.Response): void {
        try {
            let heroBusiness = new HeroBusiness();
            heroBusiness.getAll((error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    result && result.length == 0 ?
                        res.status(404).send({ 'ERROR': 'No existen heroes' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error })
        }
    }

    create(req: express.Request, res: express.Response) {
        try {
            let heroe: IHeroModel = <IHeroModel>req.body;
            let heroBusiness = new HeroBusiness();
            heroBusiness.create(heroe, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    res.status(201).send({ 'CREATED': heroe });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    findById(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let heroBusiness = new HeroBusiness();
            heroBusiness.findById(_id, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Heroe no encontrado' }) :
                        res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    update(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let heroe: IHeroModel = <IHeroModel>req.body;
            let heroBusiness = new HeroBusiness();
            heroBusiness.update(_id, heroe, (error, result) => {
                error || (result && result.nModified === 0) ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Heroe no encontrado - no se puede actualizar' }) :
                        res.status(200).send({ 'UPDATED': heroe });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
    delete(req: express.Request, res: express.Response) {
        try {
            let _id: string = req.params._id;
            let heroBusiness = new HeroBusiness();
            heroBusiness.delete(_id, (error, result) => {
                error ?
                    res.status(400).send({ 'ERROR': error, 'MSG': 'error en su solicitud' }) :
                    !result ?
                        res.status(404).send({ 'ERROR': 'Heroe no encontrado - no se puede eliminar' }) :
                        res.status(200).send({ 'DELETED': _id });
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error });
        }
    }
}





// import * as express from 'express';
// import { HeroBusiness } from '../business/hero-business';
// import { IBaseController } from './interfaces/base-controller';
// import { IHeroModel } from '../models/interfaces/hero-model';

// export class HeroController implements IBaseController<HeroBusiness> {
//     create(req: express.Request, res: express.Response): void {
//         try {
//             let hero: IHeroModel = <IHeroModel>req.body;
//             let heroBusiness = new HeroBusiness();
//             heroBusiness.create(hero, (error, result) => {
//                 if (error) {
//                     res.status(400).send({ "ERROR": error });
//                 } else {
//                     res.status(201).send({ "CREATED": hero });
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ "ERROR": "error en su solicitud" });
//         }
//     }

//     getAll(req: express.Request, res: express.Response): void {
//         try {
//             let heroBusiness = new HeroBusiness();
//             heroBusiness.getAll((error, result) => {
//                 if (error) {
//                     res.status(400).send({ "ERROR": error });
//                 } else if (!result) {
//                     res.status(404).send({ "ERROR": "Heroes no encontrados" });
//                 } else {
//                     res.status(200).send(result);
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ "ERROR": "error en su solicitud" });
//         }
//     }

//     update(req: express.Request, res: express.Response): void {
//         try {
//             let hero: IHeroModel = <IHeroModel>req.body;
//             let _id: string = req.params._id;
//             let heroBusiness = new HeroBusiness();
//             heroBusiness.update(_id, hero, (error, result) => {
//                 if (error) {
//                     res.status(400).send({ "ERROR": error });
//                 } else if (!result) {
//                     res.status(404).send({ "ERROR": "Heroe no encontrado - no se puede actualizar" })
//                 } else if (result.ok !== 1) {
//                     res.status(400).send({ "ERROR": "Heroe no modificado" });
//                 } else {
//                     res.status(200).send({ "UPDATED": hero });
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ "ERROR": "error en su solicitud" });
//         }
//     }

//     delete(req: express.Request, res: express.Response): void {
//         try {
//             let _id: string = req.params._id;
//             let heroBusiness = new HeroBusiness();
//             heroBusiness.delete(_id, (error, result) => {
//                 if (error) {
//                     res.status(400).send({ "ERROR": error });
//                 } else if (!result) {
//                     res.status(404).send({ "ERROR": "Heroe no encontrado - no se puede borrar" })
//                 } else {
//                     res.status(200).send({ "DELETED": result });
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ "ERROR": "error en su solicitud" });
//         }
//     }

//     findById(req: express.Request, res: express.Response): void {
//         try {
//             let _id: string = req.params._id;
//             let heroBusiness = new HeroBusiness();
//             heroBusiness.findById(_id, (error, result) => {
//                 if (error) {
//                     res.status(400).send({ "ERROR": error });
//                 } else if (!result) {
//                     res.status(404).send({ "ERROR": "Heroe no encontrado" });
//                 } else {
//                     res.status(200).send(result);
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ "ERROR": "error en su solicitud" });
//         }
//     }
// }