import { DataAccess } from '../../../config/data_access'
import { IHeroModel } from '../interfaces/hero-model'

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class HeroSchema {
    static get schema() {
        let schema = mongoose.Schema({
            name: { type: String, required: true, unique: true },
            power: { type: Number, required: true },
            amountPeopleSaved: { type: Number, required: true }
        });
        return schema;
    }
}

const Heroes = mongooseConnection.model<IHeroModel>('Heroes', HeroSchema.schema);
export = Heroes;