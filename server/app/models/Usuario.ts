import { IUsuarioDocument } from './interfaces/IUsuario';

export class Usuario {
    private _usuario: IUsuarioDocument;

    constructor(usuarioDocument: IUsuarioDocument) {
        this._usuario = usuarioDocument;
    }
    
    public get username() : string {
        return this._usuario.username;
    }

}