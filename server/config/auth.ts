import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Usuarios } from '../app/models/schemas/UsuarioModel';
import { IUsuarioDocument } from '../app/models/interfaces/IUsuario';
import { Config } from './config';
import { UserBusiness } from '../app/business/user-business';

export class Authentication {
    login(req: express.Request, res: express.Response): void {
        try {
            let username = req.body.username || '';
            let password = req.body.password || '';

            if (!username || !password) {
                res.status(400).send({ 'ERROR': true, 'MSG': 'Usuario o contraseña incorrecta' });
            }

            Usuarios.getAuthenticated(username, password, function (err, user, reason) {
                if (err) {
                    res.status(400).send({ 'ERROR': err, 'MSG': 'Usuario o contraseña incorrecta' });
                }
                if (!user || reason !== null) {
                    let reasons = Usuarios.failedLogin;
                    switch (reason) {
                        case 0: // NOT_FOUND
                            res.status(404).send({ 'ERROR': 'Usuario no encontrado', 'MSG': 'Usuario o contraseña incorrecta' });
                            break;
                        case 1: // PASSWORD_INCORRECT
                            res.status(400).send({ 'ERROR': 'Contraseña incorrecta', 'MSG': 'Usuario o contraseña incorrecta' });
                            break;
                        case 2: // MAX_ATTEMPTS
                            res.status(401).send({ 'ERROR': 'Cuenta bloquead por máximo de intentos permitidos', 'MSG': 'Cuenta Bloqueada... intente más tarde' });
                            break;
                        default: // SERVER_ERROR
                            res.status(500).send({ 'ERROR': err, 'MSG': 'NOT_FOUND - PASSWORD_INCORRECT - MAX_ATTEMPTS' });
                            break;
                    }
                }
                if (user) {
                    // let userData = Authentication.setUser(user);
                    res.status(200).send({ token: Authentication.genToken(Authentication.setUser(user)), user: Authentication.setUser(user) });
                }
            });
        } catch (error) {
            res.status(500).send({ 'SERVER_ERROR': error.message });
        }
    }

    register(req: express.Request, res: express.Response): void {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        if (!username || !password || !email) {
            res.status(422).send({ 'ERROR': true, 'MSG': 'Los campos usuario, password, email son obligatorios' });
        }

        let userBusiness = new UserBusiness();
        let newUser: IUsuarioDocument = <IUsuarioDocument>({
            username: username,
            password: password,
            email: email
        });
        userBusiness.create(newUser, (error, user: IUsuarioDocument) => {
            if (error) {
                res.status(400).send({ 'ERROR': true, 'MSG': error });
            }
            res.status(201).send({ token: Authentication.genToken(Authentication.setUser(user)), user: Authentication.setUser(user) });
        });
    }

    private static genToken(user) {
        return jwt.sign(user, Config.SECRET, {
            expiresIn: this.expiresIn()
        })
    }

    private static expiresIn(): number {
        let expiresDate = new Date();
        return expiresDate.setDate(expiresDate.getHours() + Config.TOKEN_EXPIRES_TIME)
    }

    private static setUser(user: IUsuarioDocument) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    }
}