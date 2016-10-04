import { IHeroeDocument } from './interfaces/IHeroe';

export class HeroModel {
    private _heroModel: IHeroeDocument;

    constructor(heroModel: IHeroeDocument) {
        this._heroModel = heroModel;
    }

    public get name() : string {
        return this._heroModel.name;
    }

    public get power() : number {
        return this._heroModel.power;
    }

    public get amountPeopleSaved() : number {
        return this._heroModel.amountPeopleSaved;
    }
}