import * as mongoose from 'mongoose';

export interface IHeroModel extends mongoose.Document {
    power: number;
    amountPeopleSaved: number;
    name: string;
}