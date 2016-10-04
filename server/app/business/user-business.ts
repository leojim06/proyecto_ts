import { UserRepository } from '../repository/user-repository';
import { IBaseBusiness } from './interfaces/base-business';
import { IUsuarioDocument } from '../models/interfaces/IUsuario';
import { Usuarios } from '../models/schemas/UsuarioModel';

export class UserBusiness implements IBaseBusiness<IUsuarioDocument> {
    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository(Usuarios);
    }
    getAll(callback: (error: any, result: any) => void) {
        this._userRepository.getAll(callback);
    }

    create(item: IUsuarioDocument, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);
    }
    findById(_id: string, callback: (error: any, result: IUsuarioDocument) => void) {
        this._userRepository.findById(_id, callback);
    }
    update(_id: string, item: IUsuarioDocument, callback: (error: any, result: any) => void) {
        this._userRepository.findById(_id, (err, res) => {
            if (err || !res) {
                return callback(err, res);
            }
            this._userRepository.update(res._id, item, callback);
        });
    }
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._userRepository.findById(_id, (err, res) => {
            if (err || !res) {
                return callback(err, res);
            }
            this._userRepository.delete(res._id, callback);
        });
    }
}