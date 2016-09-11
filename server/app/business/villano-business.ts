import { VillanoRepository } from '../repository/villano-repository';
import { IBaseBusiness } from './interfaces/base-business';
import { IVillanoModel } from '../models/interfaces/villano-model';
import * as VillanoSchema from '../models/schemas/villano-schema';

export class VillanoBusiness implements IBaseBusiness<IVillanoModel> {
    private _villainRepository: VillanoRepository;

    constructor() {
        this._villainRepository = new VillanoRepository(VillanoSchema);
    }
    getAll(callback: (error: any, result: any) => void) {
        this._villainRepository.getAll(callback);
    }

    create(item: IVillanoModel, callback: (error: any, result: any) => void) {
        this._villainRepository.create(item, callback);
    }
    findById(_id: string, callback: (error: any, result: IVillanoModel) => void) {
        this._villainRepository.findById(_id, callback);
    }
    update(_id: string, item: IVillanoModel, callback: (error: any, result: any) => void) {
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