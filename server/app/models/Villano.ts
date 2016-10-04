import { IVillanoDocument } from './interfaces/IVillano';

export class Villano {
    private _villano: IVillanoDocument;

    constructor(villanoDocument: IVillanoDocument) {
        this._villano = villanoDocument;
    }

    public get name() : string {
        return this._villano.name;
    }

    public get power() : number {
        return this._villano.power;
    }

    public get amountPeopleKilled() : number {
        return this._villano.amountPeopleKilled;
    }
}