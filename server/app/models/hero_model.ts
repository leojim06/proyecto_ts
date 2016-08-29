import { IHeroModel } from './interfaces/hero_model';

export class HeroModel {
    private _heroModel: IHeroModel;

    constructor(heroModel: IHeroModel) {
        this._heroModel = heroModel;
    }

    public get name() : string {
        return this._heroModel.name;
    }

    public get power() : string {
        return this._heroModel.power;
    }

    public get amountPeopleSaved() : number {
        return this._heroModel.amountPeopleSaved;
    }
}