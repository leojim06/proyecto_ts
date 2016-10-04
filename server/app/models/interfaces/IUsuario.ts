import * as mongoose from 'mongoose';

export interface IUsuarioDocument extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    role: string;
    activated: boolean;
    loginAttempts: number;
    lockUntil: number;

    comparePassword(candidatePassword: string, callback: (err: any, isMatch: boolean) => void);
    isLocked(): boolean;
    incLoginAttempts(callback: (err: any) => void);
}

export interface IUsuarioModel extends mongoose.Model<IUsuarioDocument> {
    getAuthenticated(username: string, password: string, callback: (err: any, result: IUsuarioDocument, reason: number) => void);
    failedLogin({}): number;
}