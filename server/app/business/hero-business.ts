import { HeroRepository } from '../repository/hero-repository';
import { IBaseBusiness } from './interfaces/base-business';
import { IHeroeDocument } from '../models/interfaces/IHeroe';
// import * as HeroSchema from '../models/schemas/hero-schema';
import { Heroes } from '../models/schemas/HeroeModel';

export class HeroBusiness implements IBaseBusiness<IHeroeDocument> {
    private _heroRepository: HeroRepository;

    constructor() {
        this._heroRepository = new HeroRepository(Heroes);
    }

    create(item: IHeroeDocument, callback: (error: any, result: any) => void) {
        this._heroRepository.create(item, callback);
    }

    getAll(callback: (error: any, result: any) => void) {
        this._heroRepository.getAll(callback);
    }

    update(_id: string, item: IHeroeDocument, callback: (error: any, result: any) => void) {
        this._heroRepository.findById(_id, (err, res) => {
            if (err || !res) {
                return callback(err, res);
            }
            this._heroRepository.update(res._id, item, callback);
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._heroRepository.findById(_id, (err, res) => {
            if (err || !res ) {
                return callback(err, res);
            }
            this._heroRepository.delete(res._id, callback);
        });
    }

    findById(_id: string, callback: (error: any, result: IHeroeDocument) => void) {
        this._heroRepository.findById(_id, callback);
    }
}