import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  engine: number;

  @Column()
  fuel: string;

  @Column()
  year: number;

  @Column()
  transmission: boolean

  @Column()
  available: boolean;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column('json')
  images: string[]
}