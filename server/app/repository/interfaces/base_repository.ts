import { IReadRepository } from './read';
import { IWriteRepository } from './write';

export interface IBaseRepository<T> extends IReadRepository<T>, IWriteRepository<T> { }