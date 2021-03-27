import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StonkEntity } from '../../../infrastructure/stock.entity';
import { Repository } from 'typeorm';
import { IStonkService } from '../../primaty-ports/stock.service.interface';
import { Stonk } from '../../model/stock.model';

@Injectable()
export class StonkService implements IStonkService {
  constructor(
    @InjectRepository(StonkEntity)
    private stonkRepository: Repository<StonkEntity>,
  ) {}

  async addStonk(stonk: Stonk): Promise<Stonk> {
    const exitingStonk = await this.stonkRepository.findOne({
      name: stonk.name,
    });
    if (exitingStonk) {
      throw new Error('Stonk already exist');
    }
    let newStonk = this.stonkRepository.create();
    newStonk.name = stonk.name;
    newStonk.price = stonk.price;
    newStonk.description = stonk.description;
    newStonk = await this.stonkRepository.save(newStonk);

    return {
      name: newStonk.name,
      price: newStonk.price,
      description: newStonk.description,
    };
  }

  async deleteStonk(stonk: Stonk): Promise<void> {
    const stonkDelete = await this.stonkRepository.findOne({
      name: stonk.name,
    });
    if (stonkDelete) {
      await this.stonkRepository.delete(stonkDelete);
    } else {
      throw new Error('No stonk to delete');
    }
  }

  async getById(name: string): Promise<Stonk> {
    const findStonk = await this.stonkRepository.findOne({ name: name });
    if (findStonk) {
      return {
        name: findStonk.name,
        price: findStonk.price,
        description: findStonk.description,
      };
    } else {
      throw new Error('Could not find Stonk');
    }
  }

  async getStonks(): Promise<Stonk[]> {
    const stonkEntities = await this.stonkRepository.find();
    if (stonkEntities) {
      const stonks: Stonk[] = JSON.parse(JSON.stringify(stonkEntities));
      return stonks;
    } else {
      throw new Error('could not find any stonks');
    }
  }

  async updateStonk(stonk: Stonk): Promise<Stonk> {
    const stonkChange = await this.stonkRepository.findOne({
      name: stonk.name,
    });
    if (stonkChange) {
      stonkChange.price = stonk.price;
      stonkChange.description = stonk.description;
      await this.stonkRepository.update(stonk.name, stonkChange);
      const updatedStonk = await this.stonkRepository.findOne({
        name: stonk.name,
      });
      if (updatedStonk) {
        return {
          name: updatedStonk.name,
          price: updatedStonk.price,
          description: updatedStonk.description,
        };
      } else {
        throw new Error('Update failed');
      }
    } else {
      throw new Error('Stonk does not exits');
    }
  }
}
