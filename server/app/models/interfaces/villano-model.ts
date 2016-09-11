import * as mongoose from 'mongoose';

export interface IVillanoModel extends mongoose.Document {
    power: number;
    amountPeopleKilled: number;
    name: string;
}