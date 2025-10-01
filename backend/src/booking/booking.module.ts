import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UserEntity } from '../users/entity/user.entity';
import { VehicleEntity } from '../vehicles/entity/vehicle.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, UserEntity, VehicleEntity]),
    AuthModule, 
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule { }

