import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { VehicleEntity } from '../../vehicles/entity/vehicle.entity';

@Entity('bookings')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.booking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: VehicleEntity;

    @Column({ nullable: true })
    pickup: string;

    @Column({ nullable: true })
    dropoff: string;

    @Column({ type: 'date' })
    startDate: string;

    @Column({ type: 'date' })
    endDate: string;

    @Column({ default: false })
    confirmed: boolean;
}
