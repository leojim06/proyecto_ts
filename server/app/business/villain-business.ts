import { VillainRepository } from '../repository/villain-repository';
import { IBaseBusiness } from './interfaces/base-business';
import { IVillainModel } from '../models/interfaces/villain-model';
import * as VillainSchema from '../models/schemas/villain-schema';

export class VillainBusiness implements IBaseBusiness<IVillainModel> {
    private _villainRepository: VillainRepository;

    constructor() {
        this._villainRepository = new VillainRepository(VillainSchema);
    }

    create(item: IVillainModel, callback: (error: any, result: any) => void) {
        this._villainRepository.create(item, callback);
    }

    getAll(callback: (error: any, result: any) => void) {
        this._villainRepository.getAll(callback);
    }

    update(_id: string, item: IVillainModel, callback: (error: any, result: any) => void) {
        this._villainRepository.findById(_id, (err, res) => {
            if (err) {
                return callback(err, res);
            }
            this._villainRepository.update(res._id, item, callback);
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._villainRepository.findById(_id, (err, res) => {
            if (err) {
                return callback(err, res);
            }
            this._villainRepository.delete(res._id, callback);
        });
    }

    findById(_id: string, callback: (error: any, result: IVillainModel) => void) {
        this._villainRepository.findById(_id, callback);
    }
}