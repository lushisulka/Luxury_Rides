import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './entity/booking.entity';
import { UserEntity } from '../users/entity/user.entity';
import { VehicleEntity } from '../vehicles/entity/vehicle.entity';
import { CreateBookDto } from './DTO/bookCar.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(BookingEntity)
        private bookingRepository: Repository<BookingEntity>,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(VehicleEntity)
        private vehicleRepository: Repository<VehicleEntity>,
    ) { }

    async createBooking(data: CreateBookDto): Promise<any> {
        try {
            const user = await this.userRepository.findOne({ where: { id: data.user_id } });
            const vehicle = await this.vehicleRepository.findOne({ where: { id: data.vehicle_id } });
            if (!user || !vehicle) {
                throw new Error('User or Vehicle not found');
            }

            await this.vehicleRepository.update(vehicle.id, { available: false });
            const booking = this.bookingRepository.create({
                user,
                vehicle,
                startDate: data.startDate,
                endDate: data.endDate,
                pickup: data?.pickup || "",
                dropoff: data?.dropoff || "",
                confirmed: false,
            });

            return await this.bookingRepository.save(booking);
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    }

    findAll(): Promise<BookingEntity[]> {
        return this.bookingRepository.find({ relations: ['user', 'vehicle'] });
    }
    async findOne(id: number): Promise<BookingEntity> {
        const booking = await this.bookingRepository.findOne({ where: { id }, relations: ['user', 'vehicle'] });
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }

    async confirmBooking(id: number): Promise<BookingEntity> {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id } });
            if (!booking) throw new Error('This car was not booked');
            booking.confirmed = true;
            return this.bookingRepository.save(booking);
        } catch (error) {
            throw new Error(`Failed to confirm booking: ${error.message}`);
        }
    }

    async removeBooking(id: number): Promise<void> {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id }, relations: ['user', 'vehicle'] });
            if (!booking) throw new Error('This car was not booked');

            booking.vehicle.available = true;
            await this.vehicleRepository.save(booking.vehicle);

            await this.bookingRepository.delete(booking.id);
        } catch (error) {
            throw new Error(`Failed to remove booking: ${error.message}`);
        }
    }

    async findBookingsByUser(userId: number): Promise<BookingEntity[]> {
        return this.bookingRepository.find({
            where: { user: { id: userId } },
            relations: ['vehicle', 'user'],
            order: { startDate: 'DESC' },
        });
    }
}

