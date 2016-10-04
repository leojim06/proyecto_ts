import * as Mongoose from 'mongoose';
import { DataAccess } from '../../../config/data_access'
import { IHeroeModel } from '../interfaces/IHeroe'

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const HeroeSchema: Mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    power: { type: Number, required: true },
    amountPeopleSaved: { type: Number, required: true }
}, { timestamps: true });

export const Heroes = <IHeroeModel>mongooseConnection.model('Heroes', HeroeSchema);
