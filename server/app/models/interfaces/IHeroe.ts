import * as mongoose from 'mongoose';

export interface IHeroeDocument extends mongoose.Document {
    power: number;
    amountPeopleSaved: number;
    name: string;
}

export interface IHeroeModel extends mongoose.Model<IHeroeDocument> {}