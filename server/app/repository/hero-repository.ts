import * as mongoose from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository';
import { IHeroeDocument } from '../models/interfaces/IHeroe';

export class HeroRepository implements IBaseRepository<IHeroeDocument> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: IHeroeDocument, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
    }

    getAll(callback: (error: any, result: any) => void) {
        this._model.find({}, callback);
    }

    update(_id: mongoose.Types.ObjectId, item: IHeroeDocument, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: mongoose.Types.ObjectId, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: _id }, (err) => callback(err, { _id: _id }));
    }

    findById(_id: string, callback: (error: any, result: IHeroeDocument) => void) {
        this._model.findById(_id, callback);
    }
}