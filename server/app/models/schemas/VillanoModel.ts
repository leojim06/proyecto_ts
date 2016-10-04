import * as Mongoose from 'mongoose';
import { DataAccess } from '../../../config/data_access'
import { IVillanoModel } from '../interfaces/IVillano'

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const VillanoSchema: Mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    power: { type: Number, required: true },
    amountPeopleKilled: { type: Number, required: true }
}, { timestamps: true });

export const Villanos = <IVillanoModel>mongooseConnection.model('Villanos', VillanoSchema);