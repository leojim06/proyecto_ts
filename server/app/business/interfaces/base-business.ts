import { IReadBusiness } from './read';
import { IWriteBusiness } from './write';

export interface IBaseBusiness<T> extends IReadBusiness<T>, IWriteBusiness<T> { }