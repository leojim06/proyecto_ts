import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Config } from '../../config/config';
import { Usuarios } from '../models/schemas/UsuarioModel';

export class VerifyAuth {
    verifyRole(role: string) {
        return function (req: express.Request, res: express.Response, next: express.NextFunction) {
            let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
            let key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

            if (token || key) {
                try {
                    let decoded = jwt.decode(token, Config.SECRET);
                    // Tiempo de token expiró
                    if (decoded.exp <= Date.now()) {
                        res.status(400).send({ 'ERROR': true, 'MSG': 'El token expiró' });
                    }
                    // Verificar información de token
                    Usuarios.findById(decoded._id, (err, user) => {
                        if (err) {
                            res.status(401).send({ 'ERROR': err, 'MSG': 'Se retiraron los privilegios del usuario' });
                        }
                        if (!user) {
                            res.status(404).send({ 'ERROR': 'Usuario no encontrado', 'MSG': 'El usuario fue retirado durante el proceso' });
                        }
                        decoded.role === user.role && user.role === role ?
                            next() :
                            res.status(403).send({ 'ERROR': true, 'MSG': 'No posee autorización para ingresar a esta sección' });
                    });
                } catch (error) {
                    res.status(500).send({ 'ERROR': error });
                }
            } else {
                res.status(400).send({ 'ERROR': true, 'MSG': 'Inicie sesión para ingresar' });
            }
        }
    }

    verifyLogin() {
        return function (req: express.Request, res: express.Response, next: express.NextFunction) {
            let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
            let key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

            if (token || key) {
                try {
                    let decoded = jwt.decode(token, Config.SECRET);
                    // Tiempo de token expiró
                    if (decoded.exp <= Date.now()) {
                        res.status(400).send({ 'ERROR': true, 'MSG': 'El token expiró' });
                    }
                    // Verificar información de token
                    Usuarios.findById(decoded._id, (err, user) => {
                        if (err) {
                            res.status(401).send({ 'ERROR': err, 'MSG': 'Se retiraron los privilegios del usuario' });
                        }
                        if (!user) {
                            res.status(404).send({ 'ERROR': 'Usuario no encontrado', 'MSG': 'El usuario fue retirado durante el proceso' });
                        }
                        next();
                    });
                } catch (error) {
                    res.status(500).send({ 'ERROR': error });
                }
            } else {
                res.status(400).send({ 'ERROR': true, 'MSG': 'Error en su solicitud. Token invalido' });
            }
        }
    }
}