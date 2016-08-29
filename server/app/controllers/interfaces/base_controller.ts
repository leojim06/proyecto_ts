import { IReadController } from './read';
import { IWriteController } from './write';

export interface IBaseController<T> extends IReadController, IWriteController { }