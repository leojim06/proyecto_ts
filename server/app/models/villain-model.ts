import { IVillainModel } from './interfaces/villain-model';

export class VillainModel {
    private _villainModel: IVillainModel;

    constructor(villainModel: IVillainModel) {
        this._villainModel = villainModel;
    }

    public get name() : string {
        return this._villainModel.name;
    }

    public get power() : number {
        return this._villainModel.power;
    }

    public get amountPeopleSaved() : number {
        return this._villainModel.amountPeopleKilled;
    }
}