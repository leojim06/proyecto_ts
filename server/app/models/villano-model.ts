import { IVillanoModel } from './interfaces/villano-model';

export class VillainModel {
    private _villainModel: IVillanoModel;

    constructor(villainModel: IVillanoModel) {
        this._villainModel = villainModel;
    }

    public get name() : string {
        return this._villainModel.name;
    }

    public get power() : number {
        return this._villainModel.power;
    }

    public get amountPeopleKilled() : number {
        return this._villainModel.amountPeopleKilled;
    }
}