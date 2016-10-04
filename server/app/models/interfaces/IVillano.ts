import * as mongoose from 'mongoose';

export interface IVillanoDocument extends mongoose.Document {
    power: number;
    amountPeopleKilled: number;
    name: string;
}

export interface IVillanoModel extends mongoose.Model<IVillanoDocument> {}