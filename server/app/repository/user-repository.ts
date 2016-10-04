import * as mongoose from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository';
import { IUsuarioDocument } from '../models/interfaces/Iusuario';

export class UserRepository implements IBaseRepository<IUsuarioDocument> {
    private _model: mongoose.Model<mongoose.Document>;
    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    getAll(callback: (error: any, result: any) => void) {
        this._model.find({}, callback);
    }
    create(item: IUsuarioDocument, callback: (error: any, rsult: any) => void) {
        this._model.create(item, callback);
    }
    findById(_id: string, callback: (error: any, result: IUsuarioDocument) => void) {
        this._model.findById(_id, callback);
    }
    update(_id: mongoose.Types.ObjectId, item: IUsuarioDocument, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }
    delete(_id: mongoose.Types.ObjectId, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: _id }, (err) => callback(err, { _id: _id }));
    }
}