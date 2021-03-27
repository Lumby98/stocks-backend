import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StonkEntity {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}
