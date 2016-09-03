import * as mongoose from 'mongoose';

export interface IVillainModel extends mongoose.Document {
    power: number;
    amountPeopleKilled: number;
    name: string;
}