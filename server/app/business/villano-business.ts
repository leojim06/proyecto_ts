import { VillanoRepository } from '../repository/villano-repository';
import { IBaseBusiness } from './interfaces/base-business';
import { IVillanoDocument } from '../models/interfaces/IVillano';
import { Villanos } from '../models/schemas/VillanoModel';

export class VillanoBusiness implements IBaseBusiness<IVillanoDocument> {
    private _villainRepository: VillanoRepository;

    constructor() {
        this._villainRepository = new VillanoRepository(Villanos);
    }
    getAll(callback: (error: any, result: any) => void) {
        this._villainRepository.getAll(callback);
    }

    create(item: IVillanoDocument, callback: (error: any, result: any) => void) {
        this._villainRepository.create(item, callback);
    }
    findById(_id: string, callback: (error: any, result: IVillanoDocument) => void) {
        this._villainRepository.findById(_id, callback);
    }
    update(_id: string, item: IVillanoDocument, callback: (error: any, result: any) => void) {
        this._villainRepository.findById(_id, (err, res) => {
            if (err || !res) {
                return callback(err, res);
            }
            this._villainRepository.update(res._id, item, callback);
        });
    }
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._villainRepository.findById(_id, (err, res) => {
            if (err || !res) {
                return callback(err, res);
            }
            this._villainRepository.delete(res._id, callback);
        });
    }
}