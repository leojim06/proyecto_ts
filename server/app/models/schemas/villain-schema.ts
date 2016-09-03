import { DataAccess } from '../../../config/data_access'
import { IVillainModel } from '../interfaces/villain-model'

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class VillainSchema {
    static get schema() {
        let schema = mongoose.Schema({
            name: { type: String, required: true, unique: true },
            power: { type: Number, required: true },
            amountPeopleSaved: { type: Number, required: true }
        });
        return schema;
    }
}

const Villains = mongooseConnection.model<IVillainModel>('Villains', VillainSchema.schema);
export = Villains;