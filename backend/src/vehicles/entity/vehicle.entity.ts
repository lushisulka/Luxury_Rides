import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from 'src/booking/entity/booking.entity';

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
  transmission: boolean;

  @Column()
  available: boolean;

  @Column('json')
  images: string[];

  @OneToMany(() => BookingEntity, booking => booking.vehicle, { cascade: true })
  booking: BookingEntity[];

  @Column()
  price: number;
}