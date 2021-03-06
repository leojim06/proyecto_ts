import * as mongoose from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository';
import { IVillanoDocument } from '../models/interfaces/IVillano';

export class VillanoRepository implements IBaseRepository<IVillanoDocument> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    getAll(callback: (error: any, result: any) => void) {
        this._model.find({}, callback);
    }
    create(item: IVillanoDocument, callback: (error: any, rsult: any) => void) {
        this._model.create(item, callback);
    }
    findById(_id: string, callback: (error: any, result: IVillanoDocument) => void) {
        this._model.findById(_id, callback);
    }
    update(_id: mongoose.Types.ObjectId, item: IVillanoDocument, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }
    delete(_id: mongoose.Types.ObjectId, callback: (error: any, result: any) => void) {
        // this._model.remove({ _id: _id }, (err) => callback(err, { nRemoved: 1 }));
        this._model.remove({ _id: _id }, (err) => callback(err, { _id: _id }));
    }
}