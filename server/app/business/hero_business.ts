import { HeroRepository } from '../repository/hero_repository';
import { IBaseBusiness } from './interfaces/base_business';
import { IHeroModel } from '../models/interfaces/hero_model';
import * as HeroSchema from '../models/schemas/hero_schema';

export class HeroBusiness implements IBaseBusiness<IHeroModel> {
    private _heroRepository: HeroRepository;

    constructor() {
        this._heroRepository = new HeroRepository(HeroSchema);
    }

    create(item: IHeroModel, callback: (error: any, result: any) => void) {
        this._heroRepository.create(item, callback);
    }

    getAll(callback: (error: any, result: any) => void) {
        this._heroRepository.getAll(callback);
    }

    update(_id: string, item: IHeroModel, callback: (error: any, result: any) => void) {
        this._heroRepository.findById(_id, (err, res) => {
            if (err) {
                return callback(err, res);
            }
            this._heroRepository.update(res._id, item, callback);
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._heroRepository.findById(_id, (err, res) => {
            if (err) {
                return callback(err, res);
            }
            this._heroRepository.delete(res._id, callback);
        });
    }

    findById(_id: string, callback: (error: any, result: IHeroModel) => void) {
        this._heroRepository.findById(_id, callback);
    }
}