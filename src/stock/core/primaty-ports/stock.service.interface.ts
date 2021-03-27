import { Stonk } from '../model/stock.model';

export const IStonkServiceProvider = 'IstonkServiceProvider';

export interface IStonkService {
  getStonks(): Promise<Stonk[]>;

  updateStonk(stonk: Stonk): Promise<Stonk>;

  addStonk(stonk: Stonk): Promise<Stonk>;

  deleteStonk(stonk: Stonk): Promise<void>;

  getById(name: string): Promise<Stonk>;
}
