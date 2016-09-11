import { DataAccess } from '../../../config/data_access'
import { IVillanoModel } from '../interfaces/villano-model'

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class VillanoSchema {
    static get schema() {
        let schema = mongoose.Schema({
            name: { type: String, required: true, unique: true },
            power: { type: Number, required: true },
            amountPeopleKilled: { type: Number, required: true }
        });
        return schema;
    }
}

const Villanos = mongooseConnection.model<IVillanoModel>('Villanos', VillanoSchema.schema);
export = Villanos;