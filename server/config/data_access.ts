/// <reference path="../typings/index.d.ts" />
import * as Mongoose from 'mongoose';
import { Config } from './config'

export class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
    }

    static connect(): Mongoose.Connection {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once('open', () => { });

        process.env.NODE_ENV === 'test' ?
            this.mongooseInstance = Mongoose.connect(Config.DB_TEST) :
            this.mongooseInstance = Mongoose.connect(Config.DB);

        return this.mongooseInstance;
    }
}
DataAccess.connect();